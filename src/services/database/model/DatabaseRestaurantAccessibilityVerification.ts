import { ACCESSIBILITY_AMENITIES } from "@constants";
import { AccessibilityAmenity } from "@model";
import { IRestaurant } from "./DatabaseRestaurant";
import { IUser } from "./DatabaseUser";
import { model, Schema, Types } from "mongoose";

export interface IRestaurantAccessibilityVerification {
  authorId: IUser["_id"];
  restaurantId: IRestaurant["_id"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}

export const accessibilityVerificationSchema = new Schema<IRestaurantAccessibilityVerification>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    restaurantId: {
      type: Types.ObjectId,
      ref: "restaurant",
      required: true,
    },
    accessibilityAmenity: { type: String, enum: ACCESSIBILITY_AMENITIES, required: true },
    proofImage: { type: String, required: true },
  },
  { timestamps: true }
);

export const DatabaseRestaurantAccessibilityVerification = model<IRestaurantAccessibilityVerification>(
  "restaurantVerification",
  accessibilityVerificationSchema
);
