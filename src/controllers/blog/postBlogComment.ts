import { databaseService } from "@services";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import z from "zod";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";

type Body = Pick<DTOBlogPost["comments"][number], "text">;

type Params = Pick<DTOBlogPost, "id">;

type Response = DTOBlogPost | unknown;

export const postBlogComment = controller<AuthenticatedSession, Body, Params, Response>(
  async ({ session: { userId }, body, params: { id }, res }) => {
    try {
      const updatedBlogPost = await databaseService.createBlogComment(id, {
        authorId: userId,
        ...body,
      });

      res.status(200).send(await toDTOBlogPost(updatedBlogPost));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  {
    session: authenticatedSessionParser,
    bodySchema: z.object({
      text: z.string(),
    }),
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
