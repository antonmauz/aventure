import {databaseClient} from "../common";
import {DatabaseUser} from "../model/DatabaseUser";
import {ObjectId} from "mongodb";

export const findUserById = async (userId: string): Promise<DatabaseUser | null> => {
    const user = await databaseClient.db("aventure_test").collection("user").findOne({_id: new ObjectId(userId)});

    if (user) {
        return user;
    }

    console.log(`No user found with the id '${userId}'`);

    return null;
}