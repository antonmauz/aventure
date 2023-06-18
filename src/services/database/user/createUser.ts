import { DatabaseUser, IUser } from "../model/DatabaseUser";

type NewDatabaseUser = Pick<IUser, "firstName" | "surname" | "email" | "disabilityVerification"> & {
  password: string;
};

export const createUser = async (newUser: NewDatabaseUser): Promise<IUser> => {
  try {
    const createdUser = await DatabaseUser.create(newUser);

    console.log(`New user created with the following id: ${createdUser}`);
    return createdUser;
  } catch (error) {
    console.log("No new user created");
    throw error;
  }
};
