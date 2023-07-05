import { DatabaseHotel, MongooseHotel } from "../model/MongooseHotel";

export const findHotelsByCity = async (city: string): Promise<DatabaseHotel[]> => {
  const dbHotels = await MongooseHotel.find({
    "address.city": { $regex: new RegExp(city, "i") },
  });
  return dbHotels;
};
