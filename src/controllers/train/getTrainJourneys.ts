import express from "express";
import { tripadvisorService } from "@services";

export const getTrainJourneys = async (req: express.Request, res: express.Response) => {
  const { from, to, date } = req.query;

  const locations = [""];

  res.status(200).json(locations);
};
