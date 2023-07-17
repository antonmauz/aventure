import { Document, model, Schema } from "mongoose";
import { DatabaseUser } from "./MongooseUser";
import { addressSchema, DatabaseAddress } from "./DatabaseAddress";
import { ACCESSIBILITY_AMENITIES } from "@constants";

const HOTEL_AMENITIES = [
  "bar",
  "parkingLots",
  "fitnessCenter",
  "swimmingPool",
  "wifi",
  "restaurant",
] as const;

const STARS = [1, 2, 3, 4, 5] as const;

type HotelAmenity = (typeof HOTEL_AMENITIES)[number];
type AccessibilityAmenity = (typeof ACCESSIBILITY_AMENITIES)[number];

export interface DatabaseReview {
  authorId: DatabaseUser["_id"];
  rating: number;
  text: string;
  createdAt: Date;
}

const reviewSchema = new Schema<DatabaseReview>(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, required: true },
    text: { type: "string", required: true },
  },
  { timestamps: true }
);

export interface DatabaseHotel extends Document {
  tripadvisorId: string;
  name: string;
  address: DatabaseAddress;
  reviews: DatabaseReview[];
  stars: (typeof STARS)[number];
  rating?: number;
  highlights?: string;
  isVerified: boolean;
  images: string[];
  phoneNumber?: string;
  accessibilityAmenities: AccessibilityAmenity[];
  amenities: HotelAmenity[];
  affiliateLink: string;
}

const hotelSchema = new Schema<DatabaseHotel>(
  {
    tripadvisorId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    address: { type: addressSchema, required: true },
    reviews: { type: [reviewSchema], required: true, default: [] },
    stars: { type: Number, enum: STARS, required: true },
    rating: { type: Number, required: false },
    highlights: { type: String, required: false },
    isVerified: { type: Boolean, required: true },
    images: { type: [String], required: true, default: [] },
    phoneNumber: { type: String, required: false },
    accessibilityAmenities: { type: [String], enum: ACCESSIBILITY_AMENITIES, required: true, default: [] },
    amenities: { type: [String], enum: HOTEL_AMENITIES, required: true, default: [] },
    affiliateLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const MongooseHotel = model<DatabaseHotel>("hotel", hotelSchema);
