import { ACCESSIBILITY_AMENITIES } from "@constants";
import { AccessibilityAmenity } from "@model";
import { IHotel } from "./DatabaseHotel";
import { IUser } from "./DatabaseUser";
import { model, Schema, Types } from "mongoose";

export interface IHotelAccessibilityVerification {
  authorId: IUser["_id"];
  hotelId: IHotel["_id"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}

export const accessibilityVerificationSchema = new Schema<IHotelAccessibilityVerification>(
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

export const DatabaseHotelAccessibilityVerification = model<IHotelAccessibilityVerification>(
  "hotelVerification",
  accessibilityVerificationSchema
);
