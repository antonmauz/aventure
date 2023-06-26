import { Schema } from "mongoose";

export interface IAddress {
  street: string;
  number: string;
  zipCode: string;
  city: string;
  country: string;
}

export const addressSchema = new Schema<IAddress>(
  {
    street: { type: String, required: true },
    number: { type: String, required: true },
    zipCode: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);
