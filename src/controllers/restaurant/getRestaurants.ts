import { databaseService } from "@services";
import { toDTORestaurant } from "./toDTORestaurant";
import { controller } from "../common/controller";
import { DTORestaurant } from "../model/DTORestaurant";
import { z } from "zod";
import { ACCESSIBILITY_AMENITIES, CUISINES } from "@constants";

const SORT = ["name", "rating"] as const;

const PAGE_SIZE = 20;

type Filters = {
  isVerified?: DTORestaurant["isVerified"];
  stars?: number[];
  rating?: number[];
  accessibilityAmenities?: DTORestaurant["accessibilityAmenities"];
  cuisines?: DTORestaurant["cuisines"];
};

type Query = {
  page: number;
  searchTerm?: string;
  sort: (typeof SORT)[number];
  filters?: Filters;
};

type Response = {
  resultsCount: number;
  pageSize: number;
  data: DTORestaurant[];
};

export const getRestaurants = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { searchTerm, page, sort, filters }, res }) => {
    const restaurants = await databaseService.findRestaurantsBySearchTerm(searchTerm ?? "");

    let filteredRestaurants = restaurants;

    if (sort === "name") {
      filteredRestaurants?.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "rating") {
      filteredRestaurants?.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }

    const { rating, accessibilityAmenities, cuisines } = filters ?? {};

    if (filters?.isVerified) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) => restaurant.isVerified);
    }
    if (rating) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        rating.includes(restaurant.rating ?? 0)
      );
    }
    if (cuisines) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        cuisines.every((c) => restaurant.cuisines.includes(c))
      );
    }
    if (accessibilityAmenities) {
      filteredRestaurants = filteredRestaurants.filter((restaurant) =>
        accessibilityAmenities.every((amenity) => restaurant.accessibilityAmenities.includes(amenity))
      );
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;

    const paginatedRestaurants = filteredRestaurants.slice(startIndex, endIndex);

    res.status(200).json({
      resultsCount: filteredRestaurants.length,
      pageSize: PAGE_SIZE,
      data: await Promise.all(paginatedRestaurants.map(toDTORestaurant)),
    });
  },
  {
    querySchema: z.object({
      searchTerm: z.string().optional(),
      page: z.string().transform((string) => parseInt(string)),
      sort: z.enum(SORT),
      filters: z
        .object({
          isVerified: z.string().transform((string) => string === "true"),
          rating: z.array(z.string().transform((string) => parseInt(string))).optional(),
          accessibilityAmenities: z.array(z.enum(ACCESSIBILITY_AMENITIES)).optional(),
          cuisines: z.array(z.enum(CUISINES)).optional(),
        })
        .optional(),
    }),
  }
);
