import { DatabaseHotel, MongooseHotel } from "../model/MongooseHotel";

export const findHotelsBySearchTerm = async (searchTerm: string): Promise<DatabaseHotel[]> => {
  const dbHotels = await MongooseHotel.find().or([
    { "address.city": { $regex: searchTerm, $options: "i" } },
    {
      name: { $regex: searchTerm, $options: "i" },
    },
    {
      highlights: { $regex: searchTerm, $options: "i" },
    },
  ]);
  
  return dbHotels;
};
