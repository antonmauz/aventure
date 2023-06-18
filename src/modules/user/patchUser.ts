import { databaseService } from "@services";
import express from "express";

export const patchUser = async (req: express.Request, res: express.Response) => {
  await databaseService.updateUserById(req.body.userId, req.body.updatedUser).catch((err) => {
    // handle not updated
    throw err;
  });

  res.status(200).send("OK");
};
