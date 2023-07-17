import { findUserByEmail, findUserById } from "./user/findUser";
import { findRestaurantById } from "./restaurant/findRestaurant";
import { findHotelById } from "./hotel/findHotel";
import { createUser } from "./user/createUser";
import { updateUserById } from "./user/updateUser";
import { connectDB } from "./common";
import { createBlogPost } from "./blogPost/createBlogPost";
import { findBlogPostById } from "./blogPost/findBlogPostById";
import { findBlogPosts } from "./blogPost/findBlogPosts";
import { findHotelsBySearchTerm } from "./hotel/findHotelBySearchTerm";
import { createHotelReview } from "./hotel/createHotelReview";
import { createBlogComment } from "./blogPost/createBlogComment";
import { findTrainStations } from "./train/findTrainStations";
import { findTrainStation, findTrainStationByCsaIndex } from "./train/findTrainStation";
import { findRestaurantsBySearchTerm } from "./restaurant/findRestaurantsBySearchTerm";
import { createRestaurantReview } from "./restaurant/createRestaurantReview";
import { createRestaurantAccessibilityVerification } from "./verification/createRestaurantAccessibilityVerification";
import { createHotelAccessibilityVerification } from "./verification/createHotelAccessibilityVerification";
import { countBlogAccess } from "./blogPost/countBlogAccess";
import { getAllBlogPosts } from "./blogPost/getAllBlogPosts";

export { DatabaseRestaurant } from "./model/MongooseRestaurant";
export { DatabaseUser } from "./model/MongooseUser";
export { DatabaseReview, DatabaseHotel } from "./model/MongooseHotel";
export { DatabaseBlogPost } from "./model/MongooseBlogPost";
export { DatabaseTrainStation } from "./model/MongooseTrainStation";
export { DatabaseHotelAccessibilityVerification } from "./model/MongooseHotelAccessibilityVerification";
export { DatabaseRestaurantAccessibilityVerification } from "./model/MongooseRestaurantAccessibilityVerification";

export const databaseService = {
  // <-- COMMON -->
  connectDB,
  // <-- USER -->
  findUserById,
  findUserByEmail,
  createUser,
  updateUserById,
  // <-- RESTAURANT -->
  findRestaurantById,
  findRestaurantsBySearchTerm: findRestaurantsBySearchTerm,
  createRestaurantReview,
  // <-- HOTEL -->
  findHotelById,
  findHotelsBySearchTerm: findHotelsBySearchTerm,
  createHotelReview,
  // <-- BLOG -->
  createBlogPost,
  createBlogComment,
  findBlogPostById,
  findBlogPosts,
  getAllBlogPosts,
  countBlogAccess,

  // <-- Train -->
  findTrainStations,
  findTrainStation,
  findTrainStationByCsaIndex,
  // <-- Verification -->
  createHotelAccessibilityVerification,
  createRestaurantAccessibilityVerification,
};
