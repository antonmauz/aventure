import { DTOAddress } from "./common/DTOAddress";
import { DTOReview } from "./common/DTOReview";

const STARS = [1, 2, 3, 4, 5] as const;

type AccessibilityAmenity =
  | "wcWithHandles"
  | "elevatedWc"
  | "groundLevelShower"
  | "loweredSink"
  | "emergencyCord"
  | "grabBars"
  | "rampAccess"
  | "wheelchairAccessibleEntrance"
  | "accessibleParking"
  | "automaticDoors"
  | "brailleSignage"
  | "wideHallways"
  | "handrails"
  | "accessibleElevator";

type Cuisine =
  | "bavarian"
  | "german"
  | "italian"
  | "greek"
  | "indian"
  | "chinese"
  | "thai"
  | "french"
  | "spanish"
  | "turkish"
  | "vietnamese"
  | "japanese"
  | "american"
  | "mexican"
  | "african"
  | "other";

export interface DTORestaurant {
  id: string;
  name: string;
  address: DTOAddress;
  reviews: DTOReview[];
  stars: (typeof STARS)[number];
  rating: number;
  highlights: string;
  isVerified: boolean;
  images: string[];
  phoneNumber: string;
  cuisines: Cuisine[];
  accessibilityAmenities: AccessibilityAmenity[];
  affiliateLink: string;
}
