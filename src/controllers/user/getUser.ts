import { databaseService } from "@services";
import express from "express";
import { AuthenticatedRequest } from "../model/AuthenticatedRequest";
import { toDTOUser } from "./toDTOUser";

export const getUser = async (req: AuthenticatedRequest, res: express.Response) => {
  const { userId } = req;

  if (typeof userId !== "string") {
    // TODO better error mapping
    res.status(400).send("no user id provided");
    return;
  }

  await databaseService
    .findUserById(userId)
    .then((user) => {
      res.status(200).json(toDTOUser(user));
    })
    .catch((error) => {
      // handle not found in DB
      res.status(400).send(error);
      return;
    });
};
