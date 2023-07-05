import { databaseService } from "@services";
import { toDTORestaurant } from "./toDTORestaurant";
import { controller } from "../common/controller";
import { DTORestaurant } from "../model/DTORestaurant";
import { z } from "zod";

type Query = {
  city?: string;
};

type Response = DTORestaurant[];

export const getRestaurants = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { city }, res }) => {
    const restaurants = await databaseService.findRestaurantsByCity(city ?? "");

    const mappedRestaurants = await Promise.all(restaurants.map(toDTORestaurant));

    res.status(200).json(mappedRestaurants);
  },
  {
    querySchema: z.object({
      city: z.string().optional(),
    }),
  }
);
