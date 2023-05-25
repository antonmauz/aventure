import {DatabaseUser} from "../model/DatabaseUser";

type NewDatabaseUser = {
    name: string,
    email: string,
    password: string
}

export const createUser = async (newUser: NewDatabaseUser) => {
    const createdUser = await DatabaseUser.create(newUser);

    if (createdUser) {
        console.log(`New user created with the following id: ${createdUser}`);
        return
    }

    console.log("No new user created");
}