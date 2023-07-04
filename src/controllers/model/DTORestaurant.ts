import { DTOUser } from "./DTOUser";

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

type CUISINE =
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

interface Author {
  name: string;
  isVerified: boolean;
  profileImage: DTOUser["profileImage"];
}

interface Address {
  street: string;
  number: string;
  city: string;
  zipCode: string;
}

interface Review {
  author: Author;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface DTORestaurant {
  id: string;
  name: string;
  address: Address;
  reviews: Review[];
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
