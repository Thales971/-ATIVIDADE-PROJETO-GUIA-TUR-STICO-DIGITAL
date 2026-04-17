const buildImageUrl = (photoId) =>
    `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1200&q=80`;

const IMAGE_POOLS = {
    pontos: {
        default: [
            buildImageUrl('photo-1449824913935-59a10b8d2000'),
            buildImageUrl('photo-1467269204594-9661b134dd2b'),
            buildImageUrl('photo-1519501025264-65ba15a82390'),
            buildImageUrl('photo-1477959858617-67f85cf4f1df'),
        ],
        park: [
            buildImageUrl('photo-1448375240586-882707db888b'),
            buildImageUrl('photo-1501706362039-c6e80948b07c'),
        ],
        museum: [
            buildImageUrl('photo-1550745165-9bc0b252726f'),
            buildImageUrl('photo-1566737236500-c8ac43014a67'),
        ],
        historic: [
            buildImageUrl('photo-1506898665066-1e7df36d1d2b'),
            buildImageUrl('photo-1477959858617-67f85cf4f1df'),
        ],
        viewpoint: [
            buildImageUrl('photo-1500375592092-40eb2168fd21'),
            buildImageUrl('photo-1448630360428-65456885c650'),
        ],
    },
    restaurantes: {
        default: [
            buildImageUrl('photo-1414235077428-338989a2e8c0'),
            buildImageUrl('photo-1504674900247-0877df9cc836'),
            buildImageUrl('photo-1555396273-367ea4eb4db5'),
            buildImageUrl('photo-1559339352-11d035aa65de'),
        ],
        cafe: [
            buildImageUrl('photo-1495474472287-4d71bcdd2085'),
            buildImageUrl('photo-1509042239860-f550ce710b93'),
        ],
        pizza: [
            buildImageUrl('photo-1513104890138-7c749659a591'),
            buildImageUrl('photo-1515003197210-e0cd71810b5f'),
        ],
        seafood: [
            buildImageUrl('photo-1547592180-85f173990554'),
            buildImageUrl('photo-1559847844-5315695dadae'),
        ],
        grill: [
            buildImageUrl('photo-1544025162-d76694265947'),
            buildImageUrl('photo-1529692236671-f1f6cf9683ba'),
        ],
    },
};

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

        if (/park|parque|garden|jardim/.test(text) || ['park', 'garden'].includes(tags?.leisure)) {
            return 'park';
        }

        if (/viewpoint|mirante|vista/.test(text) || tags?.tourism === 'viewpoint') {
            return 'viewpoint';
        }

        if (
            /historic|igreja|forte|palacio|teatro|monumento|catedral/.test(text) ||
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

function pickFromPool(pool, seed) {
    if (!Array.isArray(pool) || pool.length === 0) {
        return null;
    }

    return pool[hashString(seed) % pool.length];
}

export function getPlaceImage({ category, tags = {}, name = '', seed = '' }) {
    const theme = selectTheme(category, tags, name);
    const pool = IMAGE_POOLS[category]?.[theme] ?? IMAGE_POOLS[category]?.default ?? [];

    return pickFromPool(pool, `${category}:${theme}:${name}:${seed}`);
}
