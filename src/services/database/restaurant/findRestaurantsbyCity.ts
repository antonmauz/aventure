import { DatabaseRestaurant, IRestaurant } from "../model/DatabaseRestaurant";

export const findRestaurantsByCity = async (city: string): Promise<IRestaurant[]> => {
  const dbRestaurants = await DatabaseRestaurant.find({
    "address.city": { $regex: new RegExp(city, "i") },
  });
  return dbRestaurants;
};
