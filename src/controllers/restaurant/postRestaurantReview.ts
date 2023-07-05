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
    console.log("postRestaurantReview", userId);
    try {
      const updateRestaurantDetailPage = await databaseService.createRestaurantReview(id, {
        authorId: userId,
        ...body,
      });

      res.status(200).send(await toDTORestaurant(updateRestaurantDetailPage));
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
