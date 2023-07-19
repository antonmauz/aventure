import { MongooseUser } from "@services";
import { controller } from "../controllers/common/controller";
import { DTOUser } from "../controllers/model/DTOUser";
import { z } from "zod";

// Define the shape of the request body
type Body = {
  email: DTOUser["email"];
};

// Define the shape of the response
type Response = string;

// Controller function to check for duplicate email
const checkDuplicateEmail = controller<undefined, Body, undefined, Response>(
  async ({ body, res, next }) => {
    try {
      // Query the database to find a user with the same email
      const user = await MongooseUser.findOne({ email: body.email }).exec();

      if (user) {
        // If a user with the same email exists, send a 400 response with an error message
        res.status(400).send("email_already_in_use");
        return;
      }

      // If no duplicate email is found, pass the request to the next middleware
      next();
    } catch (error) {
      // If an error occurs during the database query, send a 500 response with the error
      res.status(500).send("failed");
    }
  },
  {
    // Specify the schema for the request body using Zod
    bodySchema: z.object({
      email: z.string(),
    }),
  }
);

// Export the checkDuplicateEmail function as part of the verifySignUp object
export const verifySignUp = {
  checkDuplicateEmail,
};
