import { model, Schema, Document } from "mongoose";
import { VerificationStatus } from "@model";
import { VERIFICATION_STATES } from "@constants";
import { addressSchema, IAddress } from "./DatabaseAddress";

interface IDisabilityVerification {
  idImage: string;
  userImage: string;
  status: VerificationStatus;
}

const disabilityVerificationSchema = new Schema<IDisabilityVerification>(
  {
    idImage: { type: String, required: true },
    userImage: { type: String, required: true },
    status: { type: String, enum: VERIFICATION_STATES, required: true },
  },
  { timestamps: true }
);

export interface IUser extends Document {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  address?: IAddress;
  profileImage?: string;
  dateOfBirth?: Date;
  disabilityVerification?: IDisabilityVerification;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: addressSchema, required: false },
    dateOfBirth: { type: Date, required: false },
    profileImage: { type: String, required: false },
    disabilityVerification: { type: disabilityVerificationSchema, required: false },
  },
  { timestamps: true }
);

// 3. Create a Model.
export const DatabaseUser = model<IUser>("user", userSchema);
