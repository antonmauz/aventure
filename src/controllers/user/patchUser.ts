import { databaseService } from "@services";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { DTOUser } from "../model/DTOUser";
import { toDTOUser } from "./toDTOUser";
import { z } from "zod";
import { ACCESSIBILITY_AMENITIES, BAHN_CARD_OPTIONS } from "@constants";

type Body = Partial<Pick<DTOUser, "firstName" | "surname" | "email" | "dateOfBirth" | "profileImage">> & {
  disabilityVerification?: Pick<NonNullable<DTOUser["disabilityVerification"]>, "idImage" | "userImage">;
};

type Response = DTOUser | unknown;

export const patchUser = controller<AuthenticatedSession, Body, undefined, Response>(
  async ({ session: { userId }, body, res }) => {
    try {
      const updatedUser = await databaseService.updateUserById(userId, {
        ...body,
        disabilityVerification: body.disabilityVerification
          ? {
              idImage: body.disabilityVerification.idImage,
              userImage: body.disabilityVerification.userImage,
              status: "new",
            }
          : undefined,
      });

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
      address: z
        .object({
          street: z.string(),
          houseNumber: z.string(),
          zipCode: z.string(),
          city: z.string(),
          country: z.string(),
        })
        .optional(),
      bahnCard: z.enum(BAHN_CARD_OPTIONS).optional(),
      disabilityVerification: z
        .object({
          idImage: z.string(),
          userImage: z.string(),
        })
        .optional(),
      accessibilityAmenities: z.array(z.enum(ACCESSIBILITY_AMENITIES)).optional(),
    }),
  }
);
