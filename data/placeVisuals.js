function normalizeText(value) {
    return typeof value === 'string' ? value.toLowerCase() : '';
}

function hashString(value) {
    let hash = 0;

    for (const char of String(value)) {
        hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
    }

    return hash;
}

function selectTheme(category, tags = {}, name = '') {
    const text = [
        normalizeText(name),
        normalizeText(tags?.name),
        normalizeText(tags?.tourism),
        normalizeText(tags?.historic),
        normalizeText(tags?.leisure),
        normalizeText(tags?.amenity),
        normalizeText(tags?.cuisine),
    ]
        .filter(Boolean)
        .join(' ');

    if (category === 'pontos') {
        if (/museum|museu/.test(text) || tags?.tourism === 'museum') {
            return 'museum';
        }

        if (/park|parque|garden|jardim|bosque|trilha/.test(text) || ['park', 'garden'].includes(tags?.leisure)) {
            return 'park';
        }

        if (/viewpoint|mirante|vista|orla|ilha|marina|ponte/.test(text) || tags?.tourism === 'viewpoint') {
            return 'viewpoint';
        }

        if (
            /historic|igreja|forte|palacio|teatro|monumento|catedral|centro historico|memorial|farol/.test(text) ||
            Boolean(tags?.historic)
        ) {
            return 'historic';
        }

        return 'default';
    }

    if (category === 'restaurantes') {
        if (/pizza|pizzaria/.test(text) || /pizza/.test(normalizeText(tags?.cuisine))) {
            return 'pizza';
        }

        if (/cafe|caf[eé]|coffee|padaria|doceria/.test(text)) {
            return 'cafe';
        }

        if (
            /seafood|mar|fish|peixe|frutos do mar/.test(text) ||
            /seafood|fish/.test(normalizeText(tags?.cuisine))
        ) {
            return 'seafood';
        }

        if (
            /grill|churrasc|steak|bbq|barbecue/.test(text) ||
            /grill|bbq|steak|barbecue/.test(normalizeText(tags?.cuisine))
        ) {
            return 'grill';
        }

        return 'default';
    }

    return 'default';
}

const QUERY_MAP = {
    pontos: {
        museum: 'museum,architecture,gallery,city',
        park: 'park,forest,nature,trail',
        viewpoint: 'mountain,viewpoint,river,landscape',
        historic: 'historic,old-town,cathedral,city',
        default: 'city,landmark,travel,architecture',
    },
    restaurantes: {
        cafe: 'cafe,coffee,bakery,dessert',
        pizza: 'pizza,restaurant,italian-food',
        seafood: 'seafood,restaurant,fish,dish',
        grill: 'grill,barbecue,restaurant,steak',
        default: 'restaurant,food,dining,meal',
    },
};

function buildLoremFlickrUrl(query, lock) {
    return `https://loremflickr.com/1200/800/${query}?lock=${lock}`;
}

function buildPicsumUrl(seed) {
    return `https://picsum.photos/seed/${encodeURIComponent(seed)}/1200/800`;
}

export function getPlaceImageCandidates({ category, tags = {}, name = '', seed = '', ordinal = 0 }) {
    const theme = selectTheme(category, tags, name);
    const query = QUERY_MAP[category]?.[theme] ?? QUERY_MAP[category]?.default ?? 'city,travel';
    const lock = hashString(`${category}:${theme}:${name}:${seed}:${ordinal}`) % 1000000;
    const baseSeed = `${category}-${theme}-${name}-${seed}-${ordinal}`;

    return [
        buildLoremFlickrUrl(query, lock),
        buildPicsumUrl(baseSeed),
        buildPicsumUrl(`${baseSeed}-alt`),
    ];
}

export function getPlaceImage({ category, tags = {}, name = '', seed = '', ordinal = 0 }) {
    return getPlaceImageCandidates({ category, tags, name, seed, ordinal })[0];
}
