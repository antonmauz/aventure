import express from "express";
import { hashSync } from "bcryptjs";
import { databaseService } from "@services";

export const signUp = async (req: express.Request, res: express.Response) => {
  console.log(req.body);
  
  await databaseService
    .createUser({
      firstName: req.body.firstName,
      surname: req.body.surname,
      email: req.body.email,
      password: hashSync(req.body.password, 8),
      disabilityVerification: req.body.disabilityVerification
        ? {
            idImage: req.body.disabilityVerification.idImage,
            userImage: req.body.disabilityVerification.userImage,
            status: "new",
          }
        : undefined,
    })
    .then(() => {
      // TODO return user and token
      res.send({ message: "User was registered successfully!" });
    })
    .catch((error) => {
      console.log(error);
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
    });
};
