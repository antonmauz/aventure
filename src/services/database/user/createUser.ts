import { DatabaseUser, MongooseUser } from "../model/MongooseUser";

type NewDatabaseUser = Pick<
  DatabaseUser,
  "firstName" | "surname" | "email" | "password" | "disabilityVerification"
>;

export const createUser = async (newUser: NewDatabaseUser): Promise<DatabaseUser> => {
  try {
    const createdUser = await MongooseUser.create(newUser);

    console.log(`New user created with the following id: ${createdUser}`);
    return createdUser;
  } catch (error) {
    console.log("No new user created");
    throw error;
  }
};
