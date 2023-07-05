import { DatabaseRestaurant, MongooseRestaurant } from "../model/MongooseRestaurant";

export const findRestaurantsByCity = async (city: string): Promise<DatabaseRestaurant[]> => {
  const dbRestaurants = await MongooseRestaurant.find({
    "address.city": { $regex: new RegExp(city, "i") },
  });
  return dbRestaurants;
};
