import { DatabaseRestaurant, MongooseRestaurant } from "../model/MongooseRestaurant";

export const findRestaurantsBySearchTerm = async (searchTerm: string): Promise<DatabaseRestaurant[]> => {
  const dbRestaurants = await MongooseRestaurant.find().or([
    { "address.city": { $regex: searchTerm, $options: "i" } },
    {
      name: { $regex: searchTerm, $options: "i" },
    },
    {
      highlights: { $regex: searchTerm, $options: "i" },
    },
  ]);
  
  return dbRestaurants;
};
