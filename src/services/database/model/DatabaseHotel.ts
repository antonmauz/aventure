import { model, Schema, Types, Document } from "mongoose";
import { IUser } from "./DatabaseUser";
import { IAddress } from "./DatabaseAddress";

const ACCESSIBILITY_AMENITIES = [
  "wcWithHandles",
  "elevatedWc",
  "groundLevelShower",
  "loweredSink",
  "emergencyCord",
  "grabBars",
  "rampAccess",
  "wheelchairAccessibleEntrance",
  "accessibleParking",
  "automaticDoors",
  "brailleSignage",
  "wideHallways",
  "handrails",
  "accessibleElevator",
] as const;

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

const addressSchema = new Schema<IAddress>({
  street: { type: "string", required: true },
  number: { type: "string", required: true },
  city: { type: "string", required: true },
  zipCode: { type: "string", required: true },
});

export interface IReview {
  authorId: IUser["_id"];
  rating: number;
  text: string;
  createdAt: Date;
}

const reviewSchema = new Schema<IReview>({
  authorId: { type: Types.ObjectId, ref: "user", required: true },
  rating: { type: Number, required: true },
  text: { type: "string", required: true },
  createdAt: { type: Date, required: true },
});

export interface IHotel extends Document {
  id: string;
  name: string;
  address: IAddress;
  reviews: IReview[];
  stars: (typeof STARS)[number];
  rating: number;
  highlights: string;
  isVerified: boolean;
  images: string[];
  phoneNumber: string;
  accessibilityAmenities: AccessibilityAmenity[];
  amenities: HotelAmenity[];
  affiliateLink: string;
}

const hotelSchema = new Schema<IHotel>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: addressSchema, required: true },
    reviews: { type: [reviewSchema], required: true },
    stars: { type: Number, enum: STARS, required: true },
    rating: { type: Number, required: true },
    highlights: { type: String, required: true },
    isVerified: { type: Boolean, required: true },
    images: { type: [String], required: true },
    phoneNumber: { type: String, required: true },
    accessibilityAmenities: { type: [String], enum: ACCESSIBILITY_AMENITIES, required: true },
    amenities: { type: [String], enum: ACCESSIBILITY_AMENITIES, required: true },
    affiliateLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const DatabaseHotel = model<IHotel>("hotel", hotelSchema);
