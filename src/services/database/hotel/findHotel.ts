import {databaseClient} from "../common";
import {DatabaseHotel} from "../model/DatabaseHotel";

export const findHotelById = async (hotelId: string): Promise<DatabaseHotel | null> => {
    const hotel = await databaseClient.db("aventure_test").collection("hotel").findOne({_id: hotelId});

    if (hotel) {
        return hotel;
    }

    console.log(`No hotel found with the name '${hotelId}'`);

    return null
}