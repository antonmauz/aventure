import { IUser } from "../../services/database/model/DatabaseUser";
import { DTOUser } from "../model/DTOUser";

export const toDTOUser = ({ _id, firstName, surname, email, createdAt, ...user }: IUser): DTOUser => {
  return {
    ...user,
    id: _id,
    firstName,
    surname,
    email,
    createdAt,
  };
};
