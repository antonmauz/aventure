import { DatabaseRestaurant } from "../model/DatabaseRestaurant";

export const findRestaurantById = async (restaurantId: string): Promise<any> => {
  const restaurant = await DatabaseRestaurant.findById({ restaurantId });

  if (restaurant) {
    return restaurant;
  }

  console.log(`No restaurant found with the id '${restaurantId}'`);

  return null;
};
