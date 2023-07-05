import { DatabaseUser } from "@services";
import { DTOUser } from "../model/DTOUser";

export const toDTOUser = ({ _id, firstName, surname, email, createdAt, ...user }: DatabaseUser): DTOUser => {
  return {
    ...user,
    id: _id,
    firstName,
    surname,
    email,
    createdAt,
  };
};
