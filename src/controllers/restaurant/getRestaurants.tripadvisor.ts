import express from "express";
import { tripadvisorService } from "@services";

export const getRestaurantsTripadvisor = async (req: express.Request, res: express.Response) => {
  // TODO add correct params
  const locations = await tripadvisorService
    .findLocationsBySearchQuery("", {
      category: "restaurants",
      language: "en",
    })
    .catch((error) => {
      // handle not found in DB
      res.status(400).send(error);
      return;
    });

  res.status(200).json(locations);
};
