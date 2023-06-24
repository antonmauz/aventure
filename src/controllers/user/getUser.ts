import { databaseService } from "@services";
import express from "express";

interface Request extends express.Request {
  userId?: string;
}

export const getUser = async (req: Request, res: express.Response) => {
  const { userId } = req;

  if (typeof userId !== "string") {
    // TODO better error mapping
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
