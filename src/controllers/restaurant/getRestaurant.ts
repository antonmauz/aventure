import { databaseService } from "@services";
import express from "express";
import { toDTORestaurant } from "./toDTORestaurant";

export const getRestaurant = async (req: express.Request, res: express.Response) => {
  const restaurantId = req.params.id;

  const restaurant = await databaseService.findRestaurantById(restaurantId);
  // handle not found in DB
  // res.status(400).send(error);

  res.status(200).json(await toDTORestaurant(restaurant));
};
