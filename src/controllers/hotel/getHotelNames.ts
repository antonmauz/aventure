import { DTOHotelName } from "../model/DTOHotel";
import { controller } from "../common/controller";
import { databaseService } from "@services";
import { toDTOHotelNames } from "./toDTOHotelNames";

type Response = DTOHotelName[];

export const getHotelNames = controller<undefined, undefined, undefined, Response>(async ({ res }) => {
  const hotels = await databaseService.findHotelsBySearchTerm("");
  
  res.status(200).json(await toDTOHotelNames(hotels));
});
