import { DatabaseHotel, IHotel } from "../model/DatabaseHotel";

type NewDatabaseHotelReview = Pick<IHotel["reviews"][number], "authorId" | "rating" | "text">;

export const createHotelReview = async (
  id: IHotel["_id"],
  newReview: NewDatabaseHotelReview
): Promise<IHotel> => {
  try {
    const updatedHotel = (await DatabaseHotel.findByIdAndUpdate(
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
