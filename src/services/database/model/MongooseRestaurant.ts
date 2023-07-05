import { Document, model, Schema, Types } from "mongoose";
import { DatabaseReview } from "./MongooseHotel";
import { addressSchema, DatabaseAddress } from "./DatabaseAddress";

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

const reviewSchema = new Schema<DatabaseReview>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    rating: { type: Number, required: true },
    text: { type: "string", required: true },
  },
  { timestamps: true }
);

export interface DatabaseRestaurant extends Document {
  id: string;
  name: string;
  address: DatabaseAddress;
  reviews: DatabaseReview[];
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

const restaurantSchema = new Schema<DatabaseRestaurant>(
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

export const MongooseRestaurant = model<DatabaseRestaurant>("restaurant", restaurantSchema);
