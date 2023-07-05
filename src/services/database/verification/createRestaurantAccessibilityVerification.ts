import {
  DatabaseRestaurantAccessibilityVerification,
  MongooseRestaurantAccessibilityVerification,
} from "../model/MongooseRestaurantAccessibilityVerification";

type NewDatabaseAccessibilityVerification = Pick<
  DatabaseRestaurantAccessibilityVerification,
  "authorId" | "restaurantId" | "accessibilityAmenity" | "proofImage"
>;

export const createRestaurantAccessibilityVerification = async (
  newAccessibilityVerification: NewDatabaseAccessibilityVerification
) => {
  try {
    await MongooseRestaurantAccessibilityVerification.create(newAccessibilityVerification);

    console.log(`New Accessibility Verification created`);
    return;
  } catch (error) {
    console.log(`No new Accessibility Verification created`, error);
    throw error;
  }
};
