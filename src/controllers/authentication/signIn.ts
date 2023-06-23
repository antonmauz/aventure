import express from "express";
import { DatabaseUser } from "../../services/database/model/DatabaseUser";
import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config";

export const signIn = (req: express.Request, res: express.Response) => {
  DatabaseUser.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (!user) {
        console.log("User Not found.");
        return res.status(404).send({ message: "User Not found." });
      }

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
