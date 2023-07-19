import { databaseService } from "@services";
import { controller } from "../common/controller";
import { z } from "zod";
import { AuthenticatedSession, authenticatedSessionParser } from "@middlewares";

type Params = {
  id: string;
};

type Response = "OK" | "no_blog_post" | "forbidden" | "not_deleted";

export const deleteBlogPost = controller<AuthenticatedSession, undefined, Params, Response>(
  async ({ session: { userId }, params: { id }, res }) => {
    const blogPost = await databaseService.findBlogPostById(id);

    if (blogPost === null) {
      res.status(400).send("no_blog_post");
      return;
    }

    if (blogPost.authorId.toString() !== userId) {
      res.status(403).send("forbidden");
      return;
    }

    const result = await databaseService.deleteBlogPost(id);

    if (result === "not_deleted") {
      res.status(500).send("not_deleted");
      return;
    }

    res.status(200).send("OK");
  },
  {
    session: authenticatedSessionParser,
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
