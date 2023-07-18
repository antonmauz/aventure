import { DatabaseRestaurant } from "@services";
import { DTORestaurantName } from "../model/DTORestaurant";

const toDTORestaurantName = async ({ _id, name }: DatabaseRestaurant): Promise<DTORestaurantName> => {
  return {
    id: _id,
    name,
  };
};

export const toDTORestaurantNames = async (
  restaurants: DatabaseRestaurant[]
): Promise<DTORestaurantName[]> => {
  return await Promise.all(restaurants.map(toDTORestaurantName));
};
