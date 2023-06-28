import { databaseService } from "@services";
import express from "express";
import { toDTOHOTEL } from "./toDTOHotel";


export const getHotels = async (req: express.Request, res: express.Response) => {

  const city = req.query.city ?? "";

  if (typeof city !== "string") {
    res.status(400).send("error");
    return;
  }

  const hotels = await databaseService.findHotelsByCity(city);
  const mappedHotels = await Promise.all(hotels.map(toDTOHOTEL));

  res.status(200).json(mappedHotels);
};

