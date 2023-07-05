import {
  DatabaseHotelAccessibilityVerification,
  IHotelAccessibilityVerification,
} from "../model/DatabaseHotelAccessibilityVerification";

type NewDatabaseAccessibilityVerification = Pick<
  IHotelAccessibilityVerification,
  "authorId" | "hotelId" | "accessibilityAmenity" | "proofImage"
>;

export const createHotelAccessibilityVerification = async (
  newAccessibilityVerification: NewDatabaseAccessibilityVerification
) => {
  console.log("new", newAccessibilityVerification);
  try {
    await DatabaseHotelAccessibilityVerification.create(newAccessibilityVerification);

    console.log(`New Accessibility Verification created`);

    return;
  } catch (error) {
    console.log(`No new Accessibility Verification created`, error);
    throw error;
  }
};
