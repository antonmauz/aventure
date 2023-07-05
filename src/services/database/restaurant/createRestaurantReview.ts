import { DatabaseRestaurant, MongooseRestaurant } from "../model/MongooseRestaurant";

type NewDatabaseRestaurantReview = Pick<
  DatabaseRestaurant["reviews"][number],
  "authorId" | "rating" | "text"
>;

export const createRestaurantReview = async (
  id: DatabaseRestaurant["_id"],
  newReview: NewDatabaseRestaurantReview
): Promise<DatabaseRestaurant> => {
  try {
    const updatedRestaurant = (await MongooseRestaurant.findByIdAndUpdate(
      id,
      {
        $push: { reviews: newReview },
      },
      { new: true }
    ))!; // TODO remove exclamation mark
    if (updatedRestaurant === null) {
      console.log(`No restaurant found with the id'${id}'`);
      // TODO throw Error(`No restaurant found with the id '${id}'`);
    }

    return updatedRestaurant;
  } catch (error) {
    console.log("Restaurant not updated", error);
    throw error;
  }
};
