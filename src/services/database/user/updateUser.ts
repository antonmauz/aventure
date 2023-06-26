import { DatabaseUser, IUser } from "../model/DatabaseUser";

export const updateUserById = async (userId: string, updateUser: Partial<IUser>) => {
  const result = await DatabaseUser.updateOne({ _id: userId }, { $set: updateUser });

  console.log(`${result.matchedCount} document(s) matched the query criteria.`);
  console.log(`${result.modifiedCount} document(s) was/were updated.`);
};
