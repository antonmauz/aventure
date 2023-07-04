import { model, Schema, Types, Document } from "mongoose";
import { IReview } from "./DatabaseHotel";
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

const CUISINE = [
  "bavarian",
  "german",
  "italian",
  "greek",
  "indian",
  "chinese",
  "thai",
  "french",
  "spanish",
  "turkish",
  "vietnamese",
  "japanese",
  "american",
  "mexican",
  "african",
  "other",
] as const;

const STARS = [1, 2, 3, 4, 5] as const;

type AccessibilityAmenity = (typeof ACCESSIBILITY_AMENITIES)[number];
type CUISINE = (typeof CUISINE)[number];

const addressSchema = new Schema<IAddress>({
  street: { type: "string", required: true },
  number: { type: "string", required: true },
  city: { type: "string", required: true },
  zipCode: { type: "string", required: true },
});

const reviewSchema = new Schema<IReview>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, required: true },
    text: { type: "string", required: true },
  },
  { timestamps: true }
);

export interface IRestaurant extends Document {
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
  cuisines: CUISINE[];
  accessibilityAmenities: AccessibilityAmenity[];
  affiliateLink: string;
}

const restaurantSchema = new Schema<IRestaurant>(
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
    cuisines: { type: [String], enum: CUISINE, required: true },
    accessibilityAmenities: { type: [String], enum: ACCESSIBILITY_AMENITIES, required: true },
    affiliateLink: { type: String, required: true },
  },
  { timestamps: true }
);

export const DatabaseRestaurant = model<IRestaurant>("restaurant", restaurantSchema);
