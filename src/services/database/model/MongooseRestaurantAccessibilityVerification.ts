import { ACCESSIBILITY_AMENITIES } from "@constants";
import { AccessibilityAmenity } from "@model";
import { DatabaseRestaurant } from "./MongooseRestaurant";
import { DatabaseUser } from "./MongooseUser";
import { model, Schema, Types } from "mongoose";

export interface DatabaseRestaurantAccessibilityVerification {
  authorId: DatabaseUser["_id"];
  restaurantId: DatabaseRestaurant["_id"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}

export const accessibilityVerificationSchema = new Schema<DatabaseRestaurantAccessibilityVerification>(
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

export const MongooseRestaurantAccessibilityVerification = model<DatabaseRestaurantAccessibilityVerification>(
  "restaurantVerification",
  accessibilityVerificationSchema
);
