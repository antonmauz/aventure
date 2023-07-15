import { DatabaseHotel, MongooseHotel } from "../model/MongooseHotel";

type NewDatabaseHotelReview = Pick<DatabaseHotel["reviews"][number], "authorId" | "rating" | "text">;

export const createHotelReview = async (
  id: DatabaseHotel["_id"],
  newReview: NewDatabaseHotelReview,
  newRating: DatabaseHotel["rating"]
): Promise<DatabaseHotel | null> => {
  try {
    const updatedHotel = await MongooseHotel.findByIdAndUpdate(
      id,
      {
        $push: { reviews: newReview },
        $set: { rating: newRating },
      },
      { new: true }
    );

    if (updatedHotel === null) {
      console.log(`No hotel found with the id'${id}'`);
      return null;
      // TODO throw Error(`No hotel found with the id '${id}'`);
    }
    return updatedHotel;
  } catch (error) {
    console.log("Hotel not updated", error);
    throw error;
  }
};
