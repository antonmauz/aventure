import {findUserById} from "./user/findUser";
import {findRestaurantById} from "./restaurant/findRestaurant";
import {findHotelById} from "./hotel/findHotel";
import {createUser} from "./user/createUser";
import {updateUserById} from "./user/updateUser";

export const databaseService = {
    // <-- USER -->
    findUserById,
    createUser,
    updateUserById,
    // <-- RESTAURANT -->
    findRestaurantById,
    // <-- HOTEL -->
    findHotelById
}