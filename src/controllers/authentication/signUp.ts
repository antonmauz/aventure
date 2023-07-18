import { hashSync } from "bcryptjs";
import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOUser } from "../model/DTOUser";
import { z } from "zod";
import { toDTOUser } from "../user/toDTOUser";
import { sign } from "jsonwebtoken";
import { authConfig } from "@config";

type Body = Pick<DTOUser, "firstName" | "surname" | "email"> & {
  password: string;
  disabilityVerification?: Pick<NonNullable<DTOUser["disabilityVerification"]>, "idImage" | "userImage">;
};

type Response =
  | (DTOUser & {
      accessToken: string;
    })
  | "registration_failed";

export const signUp = controller<undefined, Body, undefined, Response>(
  async ({ body, res }) => {
    try {
      const user = await databaseService.createUser({
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
      });

      const accessToken = sign({ id: user.id }, authConfig.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).json({ ...toDTOUser(user), accessToken });
      return;
    } catch (error) {
      res.status(500).send("registration_failed");

      return;
    }
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
