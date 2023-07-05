import { ACCESSIBILITY_AMENITIES } from "@constants";
import { AccessibilityAmenity } from "@model";
import { DatabaseHotel } from "./MongooseHotel";
import { DatabaseUser } from "./MongooseUser";
import { model, Schema, Types } from "mongoose";

export interface DatabaseHotelAccessibilityVerification {
  authorId: DatabaseUser["_id"];
  hotelId: DatabaseHotel["_id"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}

export const accessibilityVerificationSchema = new Schema<DatabaseHotelAccessibilityVerification>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    hotelId: {
      type: Types.ObjectId,
      ref: "hotel",
      required: true,
    },
    accessibilityAmenity: { type: String, enum: ACCESSIBILITY_AMENITIES, required: true },
    proofImage: { type: String, required: true },
  },
  { timestamps: true }
);

export const MongooseHotelAccessibilityVerification = model<DatabaseHotelAccessibilityVerification>(
  "hotelVerification",
  accessibilityVerificationSchema
);
