import { DTOUser } from "./DTOUser";
import { DTOAddress } from "./DTOAddress";

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

type HotelAmenity = "bar" | "parkingLots" | "fitnessCenter" | "swimmingPool" | "wifi" | "restaurant";

interface Author {
  name: string;
  isVerified: boolean;
  profileImage: DTOUser["profileImage"];
}

interface Review {
  author: Author;
  rating: number;
  text: string;
  createdAt: Date;
}

export interface DTOHotel {
  id: string;
  name: string;
  address: DTOAddress;
  reviews: Review[];
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
