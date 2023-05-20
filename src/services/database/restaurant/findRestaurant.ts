import {databaseClient} from "../common";
import {DatabaseRestaurant} from "../model/DatabaseRestaurant";

export const findRestaurantById = async (restaurantId: string): Promise<DatabaseRestaurant | null> => {
    const restaurant = await databaseClient.db("aventure_test").collection("restaurant").findOne({_id: restaurantId});

    if (restaurant) {
        return restaurant;
    }

    console.log(`No restaurant found with the id '${restaurantId}'`);

    return null;
}