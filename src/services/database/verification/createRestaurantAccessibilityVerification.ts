import {
  DatabaseRestaurantAccessibilityVerification,
  IRestaurantAccessibilityVerification,
} from "../model/DatabaseRestaurantAccessibilityVerification";

type NewDatabaseAccessibilityVerification = Pick<
  IRestaurantAccessibilityVerification,
  "authorId" | "restaurantId" | "accessibilityAmenity" | "proofImage"
>;

export const createRestaurantAccessibilityVerification = async (
  newAccessibilityVerification: NewDatabaseAccessibilityVerification
) => {
  try {
    await DatabaseRestaurantAccessibilityVerification.create(newAccessibilityVerification);

    console.log(`New Accessibility Verification created`);
    return;
  } catch (error) {
    console.log(`No new Accessibility Verification created`, error);
    throw error;
  }
};
