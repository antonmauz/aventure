import { DatabaseUser, MongooseUser } from "../model/MongooseUser";

export const deleteUserById = async (userId: DatabaseUser["_id"]) => {
  try {
    const createdUser = await MongooseUser.deleteOne({ _id: userId });

    console.log(`User deleted with the following id: ${createdUser}`);
    return createdUser;
  } catch (error) {
    console.log("User not deleted");
    throw error;
  }
};
