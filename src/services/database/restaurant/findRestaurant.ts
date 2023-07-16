import { DatabaseRestaurant, MongooseRestaurant } from "../model/MongooseRestaurant";

export const findRestaurantById = async (restaurantId: string): Promise<DatabaseRestaurant | null> => {
  const restaurant = await MongooseRestaurant.findById(restaurantId);

  if (restaurant === null) {
    return null;
  }

  return restaurant;
};
