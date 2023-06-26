import express from "express";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config";
import { databaseService } from "@services";

export const signIn = (req: express.Request, res: express.Response) => {
  databaseService
    .findUserByEmail(req.body.email)
    .then((user) => {
      const passwordIsValid = compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        console.log("Invalid Password!");
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        firstName: user.firstName,
        email: user.email,
        accessToken: token,
      });
    })
    .catch((error) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
    });
};
