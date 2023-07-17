import { DTOAddress } from "./common/DTOAddress";
import { DTOReview } from "./common/DTOReview";

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
  rating: number | null;
  highlights?: string;
  isVerified: boolean;
  images: string[];
  phoneNumber?: string;
  cuisines: Cuisine[];
  accessibilityAmenities: AccessibilityAmenity[];
  affiliateLink: string;
}
