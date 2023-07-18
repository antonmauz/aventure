import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { AccessibilityAmenity } from "@model";
import { z } from "zod";
import { ACCESSIBILITY_AMENITIES } from "@constants";
import { DTOAccessibilityVerification } from "../model/DTOAccessibilityVerification";
import { databaseService } from "@services";

interface Body {
  hospitalityType: DTOAccessibilityVerification["hospitalityType"];
  hospitalityId: DTOAccessibilityVerification["hospitalityId"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}

type Response = "OK" | "upload_failed";

export const postAccessibilityVerification = controller<AuthenticatedSession, Body, undefined, Response>(
  async ({
    session: { userId },
    body: { hospitalityType, hospitalityId, accessibilityAmenity, proofImage },
    res,
  }) => {
    try {
      if (hospitalityType === "hotel") {
        await databaseService.createHotelAccessibilityVerification({
          authorId: userId,
          hotelId: hospitalityId,
          accessibilityAmenity,
          proofImage,
        });

        res.status(200).send("OK");
        return;
      } else {
        await databaseService.createRestaurantAccessibilityVerification({
          authorId: userId,
          restaurantId: hospitalityId,
          accessibilityAmenity,
          proofImage,
        });

        res.status(200).send("OK");
        return;
      }
    } catch (error) {
      console.log(error);

      res.status(500).send("upload_failed");
      return;
    }
  },
  {
    session: authenticatedSessionParser,
    bodySchema: z.object({
      hospitalityType: z.enum(["hotel", "restaurant"]),
      hospitalityId: z.string(),
      accessibilityAmenity: z.enum(ACCESSIBILITY_AMENITIES),
      proofImage: z.string(),
    }),
  }
);
