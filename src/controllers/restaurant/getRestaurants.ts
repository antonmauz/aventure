import { databaseService } from "@services";
import { toDTORestaurant } from "./toDTORestaurant";
import { controller } from "../common/controller";
import { DTORestaurant } from "../model/DTORestaurant";
import { z } from "zod";

type Query = {
  searchTerm?: string;
};

type Response = DTORestaurant[];

export const getRestaurants = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { searchTerm }, res }) => {
    const restaurants = await databaseService.findRestaurantsBySearchTerm(searchTerm ?? "");

    const mappedRestaurants = await Promise.all(restaurants.map(toDTORestaurant));

    res.status(200).json(mappedRestaurants);
  },
  {
    querySchema: z.object({
      searchTerm: z.string().optional(),
    }),
  }
);
