import { Document, model, Schema } from "mongoose";
import { AccessibilityAmenity, BahnCard, VerificationStatus } from "@model";
import { ACCESSIBILITY_AMENITIES, BAHN_CARD_OPTIONS, VERIFICATION_STATES } from "@constants";
import { addressSchema, DatabaseAddress } from "./DatabaseAddress";

interface DatabaseDisabilityVerification {
  idImage: string;
  userImage: string;
  status: VerificationStatus;
}

const disabilityVerificationSchema = new Schema<DatabaseDisabilityVerification>(
  {
    idImage: { type: String, required: true },
    userImage: { type: String, required: true },
    status: { type: String, enum: VERIFICATION_STATES, required: true },
  },
  { timestamps: true }
);

export interface DatabaseUser extends Document {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  address?: DatabaseAddress;
  profileImage?: string;
  dateOfBirth?: Date;
  bahnCard: BahnCard;
  accessibilityAmenities?: AccessibilityAmenity[];
  disabilityVerification?: DatabaseDisabilityVerification;
  createdAt: Date;
}

const userSchema = new Schema<DatabaseUser>(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: addressSchema, required: false },
    dateOfBirth: { type: Date, required: false },
    profileImage: { type: String, required: false },
    bahnCard: { type: String, enum: BAHN_CARD_OPTIONS, required: false },
    disabilityVerification: { type: disabilityVerificationSchema, required: false },
    accessibilityAmenities: { type: [String], enum: ACCESSIBILITY_AMENITIES, required: false },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const MongooseUser = model<DatabaseUser>("user", userSchema);
