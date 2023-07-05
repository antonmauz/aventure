import { DatabaseUser, MongooseUser } from "../model/MongooseUser";

export const findUserById = async (userId: string): Promise<DatabaseUser> => {
  const dbUser = await MongooseUser.findById(userId);

  if (!dbUser) {
    console.log(`No user found with the id '${userId}'`);
    throw `No user found with the id '${userId}'`;
  }

  return dbUser;
};

export const findUserByEmail = async (email: string): Promise<DatabaseUser> => {
  const dbUser = await MongooseUser.findOne({ email }).exec();

  if (!dbUser) {
    console.log(`No user found with the email '${email}'`);
    throw `No user found with the email '${email}'`;
  }

  return dbUser;
};
