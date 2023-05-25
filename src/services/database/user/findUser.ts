import {DatabaseUser} from "../model/DatabaseUser";

export const findUserById = async (userId: string): Promise<any> => {
    const user = await DatabaseUser.findById(userId).then((result) => {
        console.log(result)

        return result
    })

    console.log(user)

    if (user) {
        return user;
    }

    console.log(`No user found with the id '${userId}'`);

    return null;
}