import { ACCESSIBILITY_AMENITIES } from "@constants";
import { DTOUser } from "./DTOUser";
import { DTOHotel } from "./DTOHotel";
import { DTORestaurant } from "./DTORestaurant";

type AccessibilityAmenity = (typeof ACCESSIBILITY_AMENITIES)[number];

export interface DTOAccessibilityVerification {
  id: string;
  authorId: DTOUser["id"];
  hospitalityType: "hotel" | "restaurant";
  hospitalityId: DTOHotel["id"] | DTORestaurant["id"];
  accessibilityAmenity: AccessibilityAmenity;
  proofImage: string;
}
