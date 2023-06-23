import express from "express";
import { DatabaseUser } from "../services/database/model/DatabaseUser";

const checkDuplicateEmail = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  await DatabaseUser.findOne({
    email: req.body.email,
  })
    .exec()
    .then((user) => {
      if (user) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      next();
    })
    .catch((error) => {
      if (error) {
        res.status(500).send({ message: error });
        return;
      }
    });
};

export const verifySignUp = {
  checkDuplicateEmail,
};
