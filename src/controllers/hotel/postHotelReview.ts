import { AuthenticatedRequest } from "../model/AuthenticatedRequest";
import express from "express";
import { databaseService } from "@services";
import { toDTOHotel } from "./toDTOHotel";

export const postHotelReview = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const { userId } = req;
    const hotelId = req.params.id;
    const newHotelReview = req.body;
    console.log(req);

    if (typeof userId !== "string") {
      res.status(400).send("no user id provided");
      return;
    }

    const updatedHotelDetailPage = await databaseService.createHotelReview(hotelId, {
      authorId: userId,
      ...newHotelReview,
    });

    res.status(200).send(await toDTOHotel(updatedHotelDetailPage));
  } catch (error) {
    res.status(400).send(error);
  }
};
