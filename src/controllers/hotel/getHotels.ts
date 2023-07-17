import { databaseService } from "@services";
import { toDTOHotel } from "./toDTOHotel";
import { controller } from "../common/controller";
import { DTOHotel } from "../model/DTOHotel";
import { z } from "zod";

type Query = {
  searchTerm?: string;
};

type Response = DTOHotel[];

export const getHotels = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { searchTerm }, res }) => {
    const hotels = await databaseService.findHotelsBySearchTerm(searchTerm ?? "");

    const mappedHotels = await Promise.all(hotels.map(toDTOHotel));

    res.status(200).json(mappedHotels);
  },
  {
    querySchema: z.object({
      searchTerm: z.string().optional(),
    }),
  }
);
