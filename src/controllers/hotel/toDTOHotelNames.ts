import { DatabaseHotel } from "@services";
import { DTOHotelName } from "../model/DTOHotel";

const toDTOHotelName = async ({ _id, name }: DatabaseHotel): Promise<DTOHotelName> => {
  return {
    id: _id,
    name,
  };
};

export const toDTOHotelNames = async (hotels: DatabaseHotel[]): Promise<DTOHotelName[]> => {
  return await Promise.all(hotels.map(toDTOHotelName));
};
