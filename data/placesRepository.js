import placesData from './places.json';

const SIMULATED_DELAY_MS = 250;

export async function loadPlaces(category) {
    // Swap this implementation for fetch() when the project moves to an API.
    await new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY_MS));

    const places = placesData?.[category];
    return Array.isArray(places) ? places : [];
}
