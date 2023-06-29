import { findUserByEmail, findUserById } from "./user/findUser";
import { findRestaurantById } from "./restaurant/findRestaurant";
import { findHotelById } from "./hotel/findHotel";
import { createUser } from "./user/createUser";
import { updateUserById } from "./user/updateUser";
import { connectDB } from "./common";
import { createBlogPost } from "./blogPost/createBlogPost";
import { findBlogPostById } from "./blogPost/findBlogPostById";
import { findBlogPostsByTitle } from "./blogPost/findBlogPostsByTitle";
import { findHotelsByCity } from "./hotel/findHotelByCity";
import { createBlogComment } from "./blogPost/createBlogComment";
import { createHotelReview } from "./hotel/createHotelReview";

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
  // <-- HOTEL -->
  findHotelById,
  findHotelsByCity,
  createHotelReview,
  // <-- BLOG -->
  createBlogPost,
  createBlogComment,
  findBlogPostById,
  findBlogPostsByTitle,
};
