import { databaseService } from "@services";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { DTOHotel } from "../model/DTOHotel";
import z from "zod";
import { toDTOHotel } from "./toDTOHotel";

type Body = Pick<DTOHotel["reviews"][number], "text" | "rating">;

type Params = Pick<DTOHotel, "id">;

type Response = DTOHotel | unknown;

export const postHotelReview = controller<AuthenticatedSession, Body, Params, Response>(
  async ({ session: { userId }, body, params: { id }, res }) => {
    try {
      await databaseService.createHotelReview(id, { authorId: userId, ...body });

      const updatedHotelDetailPage = await databaseService.createHotelReview(id, {
        authorId: userId,
        ...body,
      });

      res.status(200).send(await toDTOHotel(updatedHotelDetailPage));
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
