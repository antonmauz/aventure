import { DatabaseUser, IUser } from "../model/DatabaseUser";

export const findUserById = async (userId: string): Promise<IUser> => {
  const dbUser = await DatabaseUser.findById(userId).exec();

  console.log(dbUser?.toJSON());

  if (!dbUser) {
    console.log(`No user found with the id '${userId}'`);
    throw `No user found with the id '${userId}'`;
  }

  return dbUser;
};
