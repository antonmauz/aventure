import { DatabaseUser, MongooseUser } from "../model/MongooseUser";

export const updateUserById = async (
  userId: string,
  updateUser: Partial<DatabaseUser>
): Promise<DatabaseUser> => {
  try {
    const updatedUser = await MongooseUser.findByIdAndUpdate(
      userId,
      {
        $set: updateUser,
      },
      { new: true }
    );

    if (updatedUser === null) {
      console.log(`No User found with the id '${userId}'`);
      throw Error("no_user_found");
    }

    return updatedUser;
  } catch (error) {
    console.log("Could not update User", error);
    throw error;
  }
};
