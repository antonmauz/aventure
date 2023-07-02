import { databaseService } from "@services";
import { controller } from "../common/controller";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { z } from "zod";
import { DESTINATIONS, TOPICS } from "@constants";

type Body = Pick<DTOBlogPost, "title" | "text" | "destinations" | "bannerImage" | "topics">;

type Params = Pick<DTOBlogPost, "id">;

type Response = DTOBlogPost | unknown;
export const postBlogPost = controller<AuthenticatedSession, Body, Params, Response>(
  async ({ session: { userId }, body, res }) => {
    try {
      const createdBlogPost = await databaseService.createBlogPost({ authorId: userId, ...body });

      res.status(200).send(await toDTOBlogPost(createdBlogPost));
    } catch (error) {
      res.status(400).send(error);
    }
  },
  {
    session: authenticatedSessionParser,
    bodySchema: z.object({
      title: z.string(),
      text: z.string(),
      destinations: z.array(z.enum(DESTINATIONS)),
      bannerImage: z.string(),
      topics: z.array(z.enum(TOPICS)),
    }),
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
