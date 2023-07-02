import { DatabaseUser, IUser } from "../model/DatabaseUser";

export const updateUserById = async (userId: string, updateUser: Partial<IUser>) => {
  try {
    const updatedUser = await DatabaseUser.findByIdAndUpdate(
      userId,
      {
        $set: updateUser,
      },
      { new: true }
    );

    if (updateUser === null) {
      console.log(`No User found with the id '${userId}'`);
      throw Error("no_user_found");
    }
    return updatedUser;
  } catch (error) {
    console.log("Could not update User", error);
    throw error;
  }
};
