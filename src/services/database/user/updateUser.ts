import { DatabaseUser, IUser } from "../model/DatabaseUser";

export const updateUserById = async (userId: string, updateUser: Partial<IUser>): Promise<IUser> => {
  try {
    const updatedUser = (await DatabaseUser.findByIdAndUpdate(userId, { $set: updateUser }, { new: true }))!; // TODO remove exclamation mark

    if (updatedUser === null) {
      console.log(`No blogPost found with the id '${userId}'`);
      // TODO throw Error(`No blogPost found with the id '${id}'`);
    }

    return updatedUser;
  } catch (error) {
    console.log("BlogPost not updated", error);
    throw error;
  }
};
