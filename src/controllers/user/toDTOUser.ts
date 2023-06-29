import { IUser } from "../../services/database/model/DatabaseUser";
import { DTOUser } from "../model/DTOUser";

export const toDTOUser = ({ _id, firstName, surname, email, createdAt }: IUser): DTOUser => {
  return {
    id: _id,
    firstName,
    surname,
    email,
    createdAt,
  };
};
