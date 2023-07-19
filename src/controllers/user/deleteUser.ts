import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import mongoose from "mongoose";
import { MongooseBlogPost, MongooseHotel, MongooseRestaurant, MongooseUser } from "@services";

type Response = "OK" | "not_deleted";

// Controller function to delete a user
export const deleteUser = controller<AuthenticatedSession, undefined, undefined, Response>(
  async ({ session: { userId }, res }) => {
    // Start a new MongoDB session
    const session = await mongoose.startSession();

    // Find hotels where the user has written reviews
    const hotels = await MongooseHotel.find({
      reviews: {
        $elemMatch: {
          authorId: userId,
        },
      },
    });

    // Update the rating and remove the user's review from each hotel
    const resultsHotels = await Promise.all(
      hotels.map(async (hotel) => {
        // Find the user's review in the hotel's reviews
        const userHotelReview = hotel.reviews.find((review) => review.authorId.toString() === userId);

        // Calculate the new rating for the hotel after removing the user's review
        const newRating =
          hotel.rating && userHotelReview
            ? (hotel.rating * hotel.reviews.length - userHotelReview.rating) / (hotel.reviews.length - 1)
            : undefined;

        // Update the hotel's rating and remove the user's review
        return MongooseHotel.updateOne(
          {
            _id: hotel._id,
          },
          {
            $set: {
              rating: newRating,
            },
            $pull: {
              reviews: {
                authorId: userId,
              },
            },
          }
        ).session(session);
      })
    );

    // Find restaurants where the user has written reviews
    const restaurants = await MongooseRestaurant.find({
      reviews: {
        $elemMatch: {
          authorId: userId,
        },
      },
    });

    // Update the rating and remove the user's review from each restaurant
    const resultRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        // Find the user's review in the restaurant's reviews
        const userHotelReview = restaurant.reviews.find((review) => review.authorId.toString() === userId);

        // Calculate the new rating for the restaurant after removing the user's review
        const newRating =
          restaurant.rating && userHotelReview && restaurant.reviews.length > 1
            ? (restaurant.rating * restaurant.reviews.length - userHotelReview.rating) /
              (restaurant.reviews.length - 1)
            : undefined;

        // Update the restaurant's rating and remove the user's review
        return MongooseRestaurant.updateOne(
          {
            _id: restaurant._id,
          },
          {
            $set: {
              rating: newRating,
            },
            $pull: {
              reviews: {
                authorId: userId,
              },
            },
          }
        ).session(session);
      })
    );

    // Delete the user's blog posts
    const resultBlogPost = await MongooseBlogPost.deleteMany({ authorId: userId }).session(session);

    // Remove the user's comments from all blog posts
    const resultBlogPostComments = await MongooseBlogPost.updateMany({
      $pull: { comments: { authorId: userId } },
    }).session(session);

    // Delete the user
    const resultUser = await MongooseUser.deleteOne({
      _id: userId,
    }).session(session);

    // Check if any operation failed and rollback the transaction
    if (
      !resultUser.acknowledged ||
      !resultBlogPost.acknowledged ||
      !resultBlogPostComments.acknowledged ||
      resultsHotels.some((result) => !result.acknowledged) ||
      resultRestaurants.some((result) => !result.acknowledged)
    ) {
      await session.abortTransaction();
      res.status(500).send("not_deleted");
      return;
    }

    // Commit the transaction and end the session
    await session.commitTransaction();
    await session.endSession();

    // Return success response
    res.status(200).send("OK");
  },
  {
    session: authenticatedSessionParser,
  }
);
