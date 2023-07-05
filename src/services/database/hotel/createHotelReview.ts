import { DatabaseHotel, MongooseHotel } from "../model/MongooseHotel";

type NewDatabaseHotelReview = Pick<DatabaseHotel["reviews"][number], "authorId" | "rating" | "text">;

export const createHotelReview = async (
  id: DatabaseHotel["_id"],
  newReview: NewDatabaseHotelReview
): Promise<DatabaseHotel> => {
  try {
    const updatedHotel = (await MongooseHotel.findByIdAndUpdate(
      id,
      {
        $push: { reviews: newReview },
      },
      { new: true }
    ))!; // TODO remove exclamation mark

    if (updatedHotel === null) {
      console.log(`No hotel found with the id'${id}'`);
      // TODO throw Error(`No blogPost found with the id '${id}'`);
    }
    return updatedHotel;
  } catch (error) {
    console.log("Hotel not updated", error);
    throw error;
  }
};
