import {DatabaseUser} from "../model/DatabaseUser";

export const updateUserById = async (userId: string, updatedUser: Partial<typeof DatabaseUser>) => {
    const result = await DatabaseUser
        .updateOne({_id: userId}, {$set: updatedUser});

    console.log(`${result.matchedCount} document(s) matched the query criteria.`);
    console.log(`${result.modifiedCount} document(s) was/were updated.`);
}