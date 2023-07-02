import { databaseService } from "@services";
import { toDTOHotel } from "./toDTOHotel";
import { controller } from "../common/controller";
import { DTOHotel } from "../model/DTOHotel";
import { z } from "zod";

type Params = {
  id: string;
};

type Response = DTOHotel;

export const getHotel = controller<undefined, undefined, Params, Response>(
  async ({ params: { id }, res }) => {
    const hotel = await databaseService.findHotelById(id);
    // handle not found in DB
    // res.status(400).send(error);

    res.status(200).json(await toDTOHotel(hotel));
  },
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
