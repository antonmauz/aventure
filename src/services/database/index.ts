import { findUserByEmail, findUserById } from "./user/findUser";
import { findRestaurantById } from "./restaurant/findRestaurant";
import { findHotelById } from "./hotel/findHotel";
import { createUser } from "./user/createUser";
import { updateUserById } from "./user/updateUser";
import { connectDB } from "./common";
import { createBlogPost } from "./blogPost/createBlogPost";
import { findBlogPostById } from "./blogPost/findBlogPostById";
import { findBlogPostsByTitle } from "./blogPost/findBlogPostsByTitle";

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
  // <-- BLOG -->
  createBlogPost,
  findBlogPostById,
  findBlogPostsByTitle,
};
