import { databaseService } from "@services";
import express from "express";
import { toDTOHOTEL } from "./toDTOHotel";


export const getHotel =async (req: express.Request, res: express.Response) => {
  const hotelId = req.params.id;

  const hotel = await databaseService.findHotelById(HotelId);
  // handle not found in DB
  // res.status(400).send(error);

  res.status(200).json(await toDTOHOTEL(Hotel));
};

