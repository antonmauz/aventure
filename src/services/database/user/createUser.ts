import {databaseClient} from "../common";
import {DatabaseUser} from "../model/DatabaseUser";

type NewDatabaseUser = Omit<DatabaseUser, "_id">

export const createUser = async (newUser: NewDatabaseUser) => {
    const createdUser = await databaseClient.db("aventure_test").collection("user").insertOne(newUser);

    if (createdUser) {
        console.log(`New user created with the following id: ${createdUser.insertedId}`);
        return
    }

    console.log("No new user created");
}