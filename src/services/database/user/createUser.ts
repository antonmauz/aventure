import {DatabaseUser} from "../model/DatabaseUser";
import {DTOUser} from "../../../modules/model/DTOUser";

type NewDatabaseUser = Pick<DTOUser, "firstName" | "surname" | "email" | "disabilityVerification"> & {
    password: string
}

export const createUser = async (newUser: NewDatabaseUser) => {
    try {
        const createdUser = await DatabaseUser.create(newUser);

        console.log(`New user created with the following id: ${createdUser}`);
        return createdUser;
    } catch (error) {
        console.log("No new user created");
        throw(error)
    }
}