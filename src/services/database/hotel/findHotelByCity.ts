import { DatabaseHotel, IHotel } from "../model/DatabaseHotel";

export const findHotelsByCity = async (city: string): Promise<IHotel[]> => {
  const dbHotels = await DatabaseHotel.find({
    'address.city': { $regex: new RegExp(city, 'i') }
  });
  return dbHotels;

};