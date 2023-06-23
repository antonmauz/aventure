import express from "express";
import { DatabaseUser } from "../../services/database/model/DatabaseUser";
import { hashSync } from "bcryptjs";

export const signUp = async (req: express.Request, res: express.Response) => {
  await DatabaseUser.create({
    username: req.body.username,
    email: req.body.email,
    password: hashSync(req.body.password, 8),
  })
    .then(() => {
      // TODO return user and token
      res.send({ message: "User was registered successfully!" });
    })
    .catch((error) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
    });
};
