import express from "express";
import { tripadvisorService } from "@services";

export const getRestaurants = async (req: express.Request, res: express.Response) => {
  const locations = await tripadvisorService.findLocations().catch((error) => {
    // handle not found in DB
    res.status(400).send(error);
    return;
  });

  res.status(200).json(locations);
};
