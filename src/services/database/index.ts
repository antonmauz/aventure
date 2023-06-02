import { findUserById } from "./user/findUser";
import { findRestaurantById } from "./restaurant/findRestaurant";
import { findHotelById } from "./hotel/findHotel";
import { createUser } from "./user/createUser";
import { updateUserById } from "./user/updateUser";
import { connectDB } from "./common";

export const databaseService = {
  // <-- COMMON -->
  connectDB,
  // <-- USER -->
  findUserById,
  createUser,
  updateUserById,
  // <-- RESTAURANT -->
  findRestaurantById,
  // <-- HOTEL -->
  findHotelById,
};
