import { hashSync } from "bcryptjs";
import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOUser } from "../model/DTOUser";
import { z } from "zod";

type Body = Pick<DTOUser, "firstName" | "surname" | "email"> & {
  password: string;
  disabilityVerification?: Pick<NonNullable<DTOUser["disabilityVerification"]>, "idImage" | "userImage">;
};

type Response = string;

export const signUp = controller<undefined, Body, undefined, Response>(
  async ({ body, res }) => {
    await databaseService
      .createUser({
        firstName: body.firstName,
        surname: body.surname,
        email: body.email,
        password: hashSync(body.password, 8),
        disabilityVerification: body.disabilityVerification
          ? {
              idImage: body.disabilityVerification.idImage,
              userImage: body.disabilityVerification.userImage,
              status: "new",
            }
          : undefined,
      })
      .then(() => {
        // TODO return user and token
        res.send("user_registered");
      })
      .catch((error) => {
        console.log(error);
        if (error) {
          res.status(500).send("registration_failed");
          return;
        }
      });
  },
  {
    bodySchema: z.object({
      firstName: z.string(),
      surname: z.string(),
      email: z.string(),
      password: z.string(),
      disabilityVerification: z
        .object({
          idImage: z.string(),
          userImage: z.string(),
        })
        .optional(),
    }),
  }
);
