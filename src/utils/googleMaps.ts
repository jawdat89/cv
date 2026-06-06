export const LOCATION_PAGE_PATH = "/location";

const GOOGLE_MAPS_EMBED_BASE = "https://www.google.com/maps/embed/v1/place";

export const buildGoogleMapsEmbedUrl = (apiKey: string, query: string) =>
  `${GOOGLE_MAPS_EMBED_BASE}?key=${encodeURIComponent(apiKey)}&q=${encodeURIComponent(query)}`;

export const getGoogleMapsSearchUrl = (query: string): string =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
