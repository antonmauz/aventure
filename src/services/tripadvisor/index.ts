import { findLocationsBySearchQuery } from "./findLocationsBySearchQuery";
import { getLocationDetails } from "./getLocationDetails";
import { findLocationsByLocation } from "./findLocationsByLocation";
import { getLocationPhotos } from "./getLocationPhotos";

export const tripadvisorService = {
  findLocationsBySearchQuery,
  getLocationDetails,
  findLocationsByLocation,
  getLocationPhotos,
};
