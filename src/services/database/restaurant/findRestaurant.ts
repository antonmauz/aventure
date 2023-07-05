import { MongooseRestaurant } from "../model/MongooseRestaurant";

export const findRestaurantById = async (restaurantId: string): Promise<any> => {
  const restaurant = await MongooseRestaurant.findById(restaurantId);
  if (restaurant) {
    return restaurant;
  }

  console.log(`No restaurant found with the id '${restaurantId}'`);

  return null;
};
