import { databaseService } from "@services";
import express from "express";

export const getUser = async (req: express.Request, res: express.Response) => {
  const userId = req.query.userId;

  if (typeof userId !== "string") {
    res.status(400).send("error");
    return;
  }

  const user = await databaseService.findUserById(userId).catch((error) => {
    // handle not found in DB
    res.status(400).send(error);
    return;
  });

  res.status(200).json(user);
};
