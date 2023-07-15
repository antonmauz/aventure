import { compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config";
import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOUser } from "../model/DTOUser";
import { z } from "zod";
import { toDTOUser } from "../user/toDTOUser";

type Body = {
  email: DTOUser["email"];
  password: string;
};

type Response =
  | {
      accessToken: null;
      message: "password_invalid";
    }
  | (DTOUser & {
      accessToken: string;
    })
  | string;

export const signIn = controller<undefined, Body, undefined, Response>(
  async ({ body: { email, password }, res }) => {
    databaseService
      .findUserByEmail(email)
      .then((user) => {
        const passwordIsValid = compareSync(password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "password_invalid",
          });
        }

        const token = sign({ id: user.id }, authConfig.secret, {
          expiresIn: 86400, // 24 hours
        });

        const dtoUser = toDTOUser(user);

        res.status(200).send({
          ...dtoUser,
          accessToken: token,
        });
      })
      .catch((error) => {
        if (error) {
          res.status(401).send("login_failed");
          return;
        }
      });
  },
  {
    bodySchema: z.object({
      email: z.string(),
      password: z.string(),
    }),
  }
);
