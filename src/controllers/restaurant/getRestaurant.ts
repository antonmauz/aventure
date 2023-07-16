import { databaseService } from "@services";
import { toDTORestaurant } from "./toDTORestaurant";
import { controller } from "../common/controller";
import { DTORestaurant } from "../model/DTORestaurant";
import { z } from "zod";

type Params = {
  id: string;
};

type Response = DTORestaurant | "no_restaurant";

export const getRestaurant = controller<undefined, undefined, Params, Response>(
  async ({ params: { id }, res }) => {
    const restaurant = await databaseService.findRestaurantById(id);

    if (restaurant === null) {
      res.status(400).send("no_restaurant");
      return;
    }

    res.status(200).json(await toDTORestaurant(restaurant));
  },
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
