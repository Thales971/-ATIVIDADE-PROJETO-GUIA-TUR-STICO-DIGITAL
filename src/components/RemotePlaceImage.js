import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'react-native';

import { getPlaceImageCandidates } from '../../data/placeVisuals';

function dedupeUrls(urls) {
    return [...new Set(urls.filter((url) => typeof url === 'string' && url.trim().length > 0))];
}

export default function RemotePlaceImage({
    uri,
    category,
    name,
    seed,
    ordinal = 0,
    style,
    resizeMode = 'cover',
}) {
    const candidateUrls = useMemo(() => {
        const fallbacks = getPlaceImageCandidates({
            category,
            name,
            seed,
            ordinal,
        });

        return dedupeUrls([uri, ...fallbacks]);
    }, [category, name, ordinal, seed, uri]);

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        setCurrentIndex(0);
    }, [candidateUrls]);

    const currentUri = candidateUrls[currentIndex];

    const handleImageError = () => {
        setCurrentIndex((index) => {
            if (index >= candidateUrls.length - 1) {
                return index;
            }

            return index + 1;
        });
    };

    if (!currentUri) {
        return null;
    }

    return (
        <Image
            source={{ uri: currentUri }}
            style={style}
            resizeMode={resizeMode}
            onError={handleImageError}
        />
    );
}