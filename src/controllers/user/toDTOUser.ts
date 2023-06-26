import { IUser } from "../../services/database/model/DatabaseUser";
import { DTOUser } from "../model/DTOUser";

export const toDTOUser = async ({ _id, ...user }: IUser): Promise<DTOUser> => {
  return {
    id: _id,
    ...user,
  };
};
