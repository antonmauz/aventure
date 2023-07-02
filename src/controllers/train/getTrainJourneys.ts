import express from "express";

export const getTrainJourneys = async (req: express.Request, res: express.Response) => {
  const { from, to, date } = req.query;

  const journeys = [""];

  res.status(200).json(journeys);
};
