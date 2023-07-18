import { DTORestaurantName } from "../model/DTORestaurant";
import { toDTORestaurantNames } from "./toDTORestaurantNames";
import { databaseService } from "@services";
import { controller } from "../common/controller";

type Response = DTORestaurantName[];

export const getRestaurantNames = controller<undefined, undefined, undefined, Response>(async ({ res }) => {
  const restaurants = await databaseService.findRestaurantsBySearchTerm("");

  res.status(200).json(await toDTORestaurantNames(restaurants));
});
