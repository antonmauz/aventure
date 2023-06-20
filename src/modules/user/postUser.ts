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
      // TODO how to add subDocs/nestedDocs disabilityVerification,
    });

    await res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
};
