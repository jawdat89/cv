import { useMemo } from "react";
import {
  buildGoogleMapsEmbedUrl,
  getGoogleMapsSearchUrl,
} from "@/utils/googleMaps";

export interface LocationMapContent {
  query: string;
  embedUrl: string | null;
  mapsUrl: string;
}

export const useLocationMapContent = (query: string): LocationMapContent =>
  useMemo(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() ?? "";

    return {
      query,
      embedUrl: apiKey ? buildGoogleMapsEmbedUrl(apiKey, query) : null,
      mapsUrl: getGoogleMapsSearchUrl(query),
    };
  }, [query]);
