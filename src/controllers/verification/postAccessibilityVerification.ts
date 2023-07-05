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
    if (hospitalityType === "hotel") {
      // TODO move into db-service
      await databaseService
        .createHotelAccessibilityVerification({
          authorId: userId,
          hotelId: hospitalityId,
          accessibilityAmenity,
          proofImage,
        })
        .then((data) => {
          console.log(data);
          res.status(200).send("OK");
        })
        .catch((error) => {
          console.log(error);

          res.status(500).send("upload_failed");
          return;
        });
    } else {
      await databaseService
        .createRestaurantAccessibilityVerification({
          authorId: userId,
          restaurantId: hospitalityId,
          accessibilityAmenity,
          proofImage,
        })
        .then((data) => {
          console.log(data);
          res.status(200).send("OK");
        })
        .catch((error) => {
          console.log(error);

          res.status(500).send("upload_failed");
          return;
        });
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
