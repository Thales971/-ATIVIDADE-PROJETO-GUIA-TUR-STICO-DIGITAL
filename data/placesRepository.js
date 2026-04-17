import placesData from './places.json';
import { getPlaceImage } from './placeVisuals';

const OVERPASS_ENDPOINT = 'https://overpass-api.de/api/interpreter';
const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/search';

// Ative para validar somente API (sem fallback local).
const FORCE_API_ONLY = false;

// Troque para as coordenadas da sua cidade.
const SEARCH_CENTER = {
    lat: -12.9714,
    lon: -38.5014,
};

const CATEGORY_CONFIG = {
    pontos: {
        radius: 14000,
        limit: 30,
        nominatimQuery: 'pontos turisticos em Salvador Bahia Brasil',
    },
    restaurantes: {
        radius: 12000,
        limit: 30,
        nominatimQuery: 'restaurants in Salvador Bahia Brazil',
    },
};

function getOverpassQueries(category, config) {
    if (category === 'pontos') {
        const tourismQuery = `
            [out:json][timeout:25];
            (
                node["tourism"~"attraction|museum|viewpoint|gallery|theme_park|zoo"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                way["tourism"~"attraction|museum|viewpoint|gallery|theme_park|zoo"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                relation["tourism"~"attraction|museum|viewpoint|gallery|theme_park|zoo"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
            );
            out center ${config.limit};
        `;

        const cityAttractionsQuery = `
            [out:json][timeout:25];
            (
                node["historic"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                way["historic"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                relation["historic"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                node["leisure"~"park|garden"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                way["leisure"~"park|garden"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                relation["leisure"~"park|garden"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
            );
            out center ${config.limit};
        `;

        return [tourismQuery, cityAttractionsQuery];
    }

    if (category === 'restaurantes') {
        return [
            `
            [out:json][timeout:25];
            (
                node["amenity"="restaurant"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                way["amenity"="restaurant"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
                relation["amenity"="restaurant"](around:${config.radius},${SEARCH_CENTER.lat},${SEARCH_CENTER.lon});
            );
            out center ${config.limit};
        `,
        ];
    }

    return [];
}

function getLocalPlaces(category) {
    const places = placesData?.[category];
    const localPlaces = Array.isArray(places) ? places : [];

    return localPlaces.map((place, index) => {
        const fallbackImage = getPlaceImage({
            category,
            name: place?.nome || '',
            seed: place?.id || index,
            ordinal: index,
        });

        return {
            ...place,
            imagem:
                typeof place?.imagem === 'string' && /^https?:\/\//i.test(place.imagem)
                    ? place.imagem
                    : fallbackImage,
        };
    });
}

function getCoordinates(element) {
    if (element?.type === 'node') {
        return { lat: element?.lat, lon: element?.lon };
    }

    if (element?.center) {
        return { lat: element.center.lat, lon: element.center.lon };
    }

    return { lat: null, lon: null };
}

async function fetchOverpassJson(query, timeoutMs = 20000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(OVERPASS_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
            body: `data=${encodeURIComponent(query)}`,
            signal: controller.signal,
        });

        if (!response.ok) {
            let details = '';

            try {
                details = await response.text();
            } catch (_error) {
                details = '';
            }

            throw new Error(`Falha HTTP ${response.status}. ${details}`.trim());
        }

        return response.json();
    } finally {
        clearTimeout(timer);
    }
}

async function fetchNominatimJson(query, limit = 20, timeoutMs = 15000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const url =
            `${NOMINATIM_ENDPOINT}?format=jsonv2&addressdetails=1&limit=${limit}` +
            `&q=${encodeURIComponent(query)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new Error(`Falha Nominatim HTTP ${response.status}`);
        }

        return response.json();
    } finally {
        clearTimeout(timer);
    }
}

function buildFallbackImage(category, id, tags = {}, name = '', ordinal = 0) {
    return getPlaceImage({ category, tags, name, seed: id, ordinal });
}

function buildLocationText(tags, lat, lon) {
    const fromTags =
        tags?.['addr:suburb'] ||
        tags?.['addr:city'] ||
        tags?.['addr:town'] ||
        tags?.['addr:street'] ||
        tags?.neighbourhood ||
        tags?.district;

    if (fromTags) {
        return fromTags;
    }

    if (typeof lat === 'number' && typeof lon === 'number') {
        return `${lat.toFixed(4)}, ${lon.toFixed(4)}`;
    }

    return 'Localizacao nao informada';
}

function buildDescription(tags, category) {
    if (typeof tags?.description === 'string' && tags.description.trim()) {
        return tags.description.trim();
    }

    if (category === 'restaurantes') {
        if (tags?.cuisine) {
            return `Especialidade: ${tags.cuisine}.`;
        }

        return 'Restaurante encontrado via OpenStreetMap.';
    }

    if (tags?.tourism) {
        return `Categoria: ${tags.tourism}.`;
    }

    return 'Ponto turistico encontrado via OpenStreetMap.';
}

function buildWikimediaImageUrl(wikimediaValue) {
    if (typeof wikimediaValue !== 'string' || !wikimediaValue.trim()) {
        return null;
    }

    const fileName = wikimediaValue.replace(/^File:/i, '').trim();

    if (!fileName) {
        return null;
    }

    return `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(fileName)}?width=1200`;
}

function pickImage(tags, category, id, name = '', ordinal = 0) {
    if (typeof tags?.image === 'string' && /^https?:\/\//i.test(tags.image)) {
        return tags.image;
    }

    const wikimediaUrl = buildWikimediaImageUrl(tags?.wikimedia_commons);

    if (wikimediaUrl) {
        return wikimediaUrl;
    }

    return buildFallbackImage(category, id, tags, name, ordinal);
}

function normalizeName(tags, category, index) {
    if (typeof tags?.name === 'string' && tags.name.trim()) {
        return tags.name.trim();
    }

    if (category === 'restaurantes') {
        return `Restaurante sem nome ${index + 1}`;
    }

    return `Ponto turistico sem nome ${index + 1}`;
}

function normalizeNominatimName(item, category, index) {
    const explicitName = typeof item?.name === 'string' ? item.name.trim() : '';

    if (explicitName) {
        return explicitName;
    }

    const display = typeof item?.display_name === 'string' ? item.display_name : '';
    const firstChunk = display.split(',')[0]?.trim();

    if (firstChunk) {
        return firstChunk;
    }

    if (category === 'restaurantes') {
        return `Restaurante ${index + 1}`;
    }

    return `Ponto turistico ${index + 1}`;
}

function mapElementToPlace(element, category, index, ordinal) {
    const tags = element?.tags || {};
    const { lat, lon } = getCoordinates(element);
    const nome = normalizeName(tags, category, index);

    return {
        id: `osm-${category}-${element?.type}-${element?.id}`,
        nome,
        descricao: buildDescription(tags, category),
        imagem: pickImage(tags, category, element?.id, nome, ordinal),
        localizacao: buildLocationText(tags, lat, lon),
        categoria: category,
    };
}

function mapNominatimItemToPlace(item, category, index, ordinal) {
    const address = item?.address || {};
    const lat = Number.parseFloat(item?.lat);
    const lon = Number.parseFloat(item?.lon);
    const locationText =
        address.suburb ||
        address.neighbourhood ||
        address.city ||
        address.town ||
        address.state ||
        (Number.isFinite(lat) && Number.isFinite(lon)
            ? `${lat.toFixed(4)}, ${lon.toFixed(4)}`
            : 'Localizacao nao informada');

    return {
        id: `nom-${category}-${item?.place_id || index}`,
        nome: normalizeNominatimName(item, category, index),
        descricao:
            category === 'restaurantes'
                ? 'Restaurante encontrado via OpenStreetMap Nominatim.'
                : 'Ponto turistico encontrado via OpenStreetMap Nominatim.',
        imagem: buildFallbackImage(
            category,
            item?.place_id || index,
            item?.tags || {},
            normalizeNominatimName(item, category, index),
            ordinal
        ),
        localizacao: locationText,
        categoria: category,
    };
}

async function fetchPlacesFromApi(category) {
    const config = CATEGORY_CONFIG[category];

    if (!config) {
        return [];
    }

    const queries = getOverpassQueries(category, config);

    if (queries.length === 0) {
        return [];
    }

    const allPlaces = [];
    let ordinal = 0;

    for (const query of queries) {
        try {
            const payload = await fetchOverpassJson(query, 25000);
            const elements = Array.isArray(payload?.elements) ? payload.elements : [];

            const mappedPlaces = elements
                .map((element, index) => mapElementToPlace(element, category, index, ordinal++))
                .filter((place) => Boolean(place.nome));

            allPlaces.push(...mappedPlaces);
        } catch (error) {
            if (category === 'restaurantes') {
                throw error;
            }
        }
    }

    if (allPlaces.length === 0) {
        return [];
    }

    const uniquePlaces = Array.from(new Map(allPlaces.map((place) => [place.id, place])).values());

    return uniquePlaces.slice(0, config.limit);
}

async function fetchPlacesFromNominatim(category) {
    const config = CATEGORY_CONFIG[category];

    if (!config?.nominatimQuery) {
        return [];
    }

    const payload = await fetchNominatimJson(config.nominatimQuery, config.limit, 15000);
    const items = Array.isArray(payload) ? payload : [];

    let ordinal = 0;

    return items
        .map((item, index) => mapNominatimItemToPlace(item, category, index, ordinal++))
        .filter((place) => Boolean(place.nome));
}

export async function loadPlaces(category) {
    const localPlaces = getLocalPlaces(category);

    const collectedPlaces = [];
    const seenIds = new Set();
    const seenPlaceKeys = new Set();

    const addPlaces = (places) => {
        for (const place of places) {
            if (!place?.id) {
                continue;
            }

            const placeKey = `${String(place.nome || '')
                .trim()
                .toLowerCase()}::${String(place.localizacao || '')
                .trim()
                .toLowerCase()}`;

            if (seenIds.has(place.id) || seenPlaceKeys.has(placeKey)) {
                continue;
            }

            seenIds.add(place.id);
            seenPlaceKeys.add(placeKey);
            collectedPlaces.push(place);

            if (collectedPlaces.length >= 30) {
                break;
            }
        }
    };

    addPlaces(localPlaces);

    try {
        const apiPlaces = await fetchPlacesFromApi(category);
        addPlaces(apiPlaces);
    } catch (_error) {
        console.warn('[placesRepository] API indisponivel:', _error?.message || _error);
    }

    if (collectedPlaces.length < 30) {
        try {
            const nominatimPlaces = await fetchPlacesFromNominatim(category);
            addPlaces(nominatimPlaces);
        } catch (nominatimError) {
            console.warn(
                '[placesRepository] Nominatim indisponivel:',
                nominatimError?.message || nominatimError
            );
        }
    }

    if (collectedPlaces.length === 0 && FORCE_API_ONLY) {
        return [];
    }

    return collectedPlaces.length > 0 ? collectedPlaces.slice(0, 30) : localPlaces;
}
