import { databaseService } from "@services";
import { toDTOHotel } from "./toDTOHotel";
import { controller } from "../common/controller";
import { DTOHotel } from "../model/DTOHotel";
import { z } from "zod";

type Query = {
  city: string;
};

type Response = DTOHotel[];

export const getHotels = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { city }, res }) => {
    const hotels = await databaseService.findHotelsByCity(city);

    const mappedHotels = await Promise.all(hotels.map(toDTOHotel));

    res.status(200).json(mappedHotels);
  },
  {
    querySchema: z.object({
      city: z.string(),
    }),
  }
);
