import { DatabaseRestaurant, IRestaurant } from "../model/DatabaseRestaurant";

type NewDatabaseRestaurantReview = Pick<IRestaurant["reviews"][number], "authorId" | "rating" | "text">;

export const createRestaurantReview = async (
  id: IRestaurant["_id"],
  newReview: NewDatabaseRestaurantReview
): Promise<IRestaurant> => {
  try {
    const updatedRestaurant = (await DatabaseRestaurant.findByIdAndUpdate(
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
