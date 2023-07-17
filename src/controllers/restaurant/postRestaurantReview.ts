import { DTORestaurant } from "../model/DTORestaurant";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { databaseService } from "@services";
import { toDTORestaurant } from "./toDTORestaurant";
import { z } from "zod";

type Body = Pick<DTORestaurant["reviews"][number], "text" | "rating">;

type Params = Pick<DTORestaurant, "id">;

type Response = DTORestaurant | unknown;

export const postRestaurantReview = controller<AuthenticatedSession, Body, Params, Response>(
  async ({ session: { userId }, body, params: { id }, res }) => {
    try {
      const restaurant = await databaseService.findRestaurantById(id);

      if (restaurant === null) {
        res.status(400).send("no_restaurant");
        return;
      }

      const reviewsCount = restaurant.reviews.length;
      const newRating = ((restaurant.rating ?? 0) * reviewsCount + body.rating) / (reviewsCount + 1);

      const updatedRestaurant = await databaseService.createRestaurantReview(
        id,
        {
          authorId: userId,
          ...body,
        },
        newRating
      );

      if (updatedRestaurant === null) {
        res.status(400).send("no_restaurant");
        return;
      }
      res.status(200).send(await toDTORestaurant(updatedRestaurant));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  {
    session: authenticatedSessionParser,
    bodySchema: z.object({
      text: z.string(),
      rating: z.number(),
    }),
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
