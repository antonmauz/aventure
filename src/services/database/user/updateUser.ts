import {databaseClient} from "../common";
import {DatabaseUser} from "../model/DatabaseUser";

export const updateUserById = async (userId: string, updatedUser: Partial<DatabaseUser>) => {
    const result = await databaseClient.db("aventure_test").collection("user")
        .updateOne({_id: userId}, {$set: updatedUser});

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}