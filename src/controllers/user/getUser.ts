import { databaseService } from "@services";
import { toDTOUser } from "./toDTOUser";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { controller } from "../common/controller";
import { DTOUser } from "../model/DTOUser";

type Response = DTOUser;

export const getUser = controller<AuthenticatedSession, undefined, undefined, Response>(
  async ({ session, res }) => {
    //TODO adjust like other controllers
    await databaseService
      .findUserById(session.userId)
      .then((user) => {
        res.status(200).json(toDTOUser(user));
        return;
      })
      .catch((error) => {
        // handle not found in DB
        res.status(400).send(error);
        return;
      });
  },
  {
    session: authenticatedSessionParser,
  }
);
