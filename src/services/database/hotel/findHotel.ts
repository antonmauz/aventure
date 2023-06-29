import { DatabaseHotel } from "../model/DatabaseHotel";

export const findHotelById = async (hotelId: string): Promise<any> => {
  const hotel = await DatabaseHotel.findById(hotelId);

  if (hotel) {
    return hotel;
  }

  console.log(`No hotel found with the id '${hotelId}'`);

  return null;
};
