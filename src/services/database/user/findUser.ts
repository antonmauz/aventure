import {DatabaseUser} from "../model/DatabaseUser";
import {DTOUser} from "../../../modules/model/DTOUser";

export const findUserById = async (userId: string): Promise<DTOUser> => {
    const dbUser = await DatabaseUser.findById(userId).exec()

    console.log(dbUser?.toJSON())

    if (!dbUser) {
        console.log(`No user found with the id '${userId}'`);
        throw (`No user found with the id '${userId}'`)
    }

    const dbUserJSON = dbUser.toJSON()

    return {
        id: dbUserJSON._id.toString(),
        ...dbUserJSON
    }
}