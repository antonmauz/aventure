import { MongooseUser } from "../services/database/model/MongooseUser";
import { controller } from "../controllers/common/controller";
import { DTOUser } from "../controllers/model/DTOUser";
import { z } from "zod";

type Body = {
  email: DTOUser["email"];
};

type Response = string;

const checkDuplicateEmail = controller<undefined, Body, undefined, Response>(
  async ({ body, res, next }) => {
    await MongooseUser.findOne({
      email: body.email,
    })
      .exec()
      .then((user) => {
        if (user) {
          res.status(400).send("email_already_in_use");
          return;
        }

        next();
      })
      .catch((error) => {
        if (error) {
          res.status(500).send(error);
          return;
        }
      });
  },
  {
    bodySchema: z.object({
      email: z.string(),
    }),
  }
);
export const verifySignUp = {
  checkDuplicateEmail,
};
