import { databaseService } from "@services";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { DTOUser } from "../model/DTOUser";
import { toDTOUser } from "./toDTOUser";
import z from "zod";

type Body = Partial<Pick<DTOUser, "firstName" | "surname" | "email" | "dateOfBirth" | "profileImage">>;

type Response = DTOUser | unknown;

export const patchUser = controller<AuthenticatedSession, Body, undefined, Response>(
  async ({ session: { userId }, body, res }) => {
    try {
      const updatedUser = await databaseService.updateUserById(userId, body);

      res.status(200).send(toDTOUser(updatedUser));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  {
    session: authenticatedSessionParser,
    bodySchema: z.object({
      firstName: z.string().optional(),
      surname: z.string().optional(),
      email: z.string().optional(),
      dateOfBirth: z
        .string()
        .optional()
        .transform((value) => (value ? new Date(value) : undefined)),
      profileImage: z.string().optional(),
    }),
  }
);
