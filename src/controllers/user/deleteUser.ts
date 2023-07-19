import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import mongoose from "mongoose";
import { MongooseBlogPost, MongooseHotel, MongooseRestaurant, MongooseUser } from "@services";

type Response = "OK" | "not_deleted";

export const deleteUser = controller<AuthenticatedSession, undefined, undefined, Response>(
  async ({ session: { userId }, res }) => {
    const session = await mongoose.startSession();

    const hotels = await MongooseHotel.find({
      reviews: {
        $elemMatch: {
          authorId: userId,
        },
      },
    });

    const resultsHotels = await Promise.all(
      hotels.map(async (hotel) => {
        const userHotelReview = hotel.reviews.find((review) => review.authorId.toString() === userId);

        const newRating =
          hotel.rating && userHotelReview
            ? (hotel.rating * hotel.reviews.length - userHotelReview.rating) / (hotel.reviews.length - 1)
            : undefined;

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

    const restaurants = await MongooseRestaurant.find({
      reviews: {
        $elemMatch: {
          authorId: userId,
        },
      },
    });

    const resultRestaurants = await Promise.all(
      restaurants.map(async (restaurant) => {
        const userHotelReview = restaurant.reviews.find((review) => review.authorId.toString() === userId);

        const newRating =
          restaurant.rating && userHotelReview && restaurant.reviews.length > 1
            ? (restaurant.rating * restaurant.reviews.length - userHotelReview.rating) /
              (restaurant.reviews.length - 1)
            : undefined;

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

    const resultBlogPost = await MongooseBlogPost.deleteMany({ authorId: userId }).session(session);

    const resultBlogPostComments = await MongooseBlogPost.updateMany({
      $pull: { comments: { authorId: userId } },
    }).session(session);

    const resultUser = await MongooseUser.deleteOne({
      _id: userId,
    }).session(session);

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

    await session.endSession();

    res.status(200).send("OK");
  },
  {
    session: authenticatedSessionParser,
  }
);
