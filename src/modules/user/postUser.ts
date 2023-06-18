import { databaseService } from "@services";
import express from "express";

export const postUser = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, surname, email, password, disabilityVerification } = req.body;

    await databaseService.createUser({
      firstName,
      surname,
      email,
      password,
      disabilityVerification: disabilityVerification
        ? {
            idImage: disabilityVerification.idImageBase64,
            userImage: disabilityVerification.userImageBase64,
            status: "new",
          }
        : undefined,
    });

    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
};
