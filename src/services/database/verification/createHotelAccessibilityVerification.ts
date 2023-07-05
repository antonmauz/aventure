import {
  DatabaseHotelAccessibilityVerification,
  MongooseHotelAccessibilityVerification,
} from "../model/MongooseHotelAccessibilityVerification";

type NewDatabaseAccessibilityVerification = Pick<
  DatabaseHotelAccessibilityVerification,
  "authorId" | "hotelId" | "accessibilityAmenity" | "proofImage"
>;

export const createHotelAccessibilityVerification = async (
  newAccessibilityVerification: NewDatabaseAccessibilityVerification
) => {
  console.log("new", newAccessibilityVerification);
  try {
    await MongooseHotelAccessibilityVerification.create(newAccessibilityVerification);

    console.log(`New Accessibility Verification created`);

    return;
  } catch (error) {
    console.log(`No new Accessibility Verification created`, error);
    throw error;
  }
};
