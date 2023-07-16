import { databaseService } from "@services";
import { toDTOBlogPost } from "./toDTOBlogPost";
import { controller } from "../common/controller";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { z } from "zod";

type Params = {
  id: string;
};

type Response = DTOBlogPost | "no_blog_post";

export const getBlogPost = controller<undefined, undefined, Params, Response>(
  async ({ params: { id }, res }) => {
    const blogPost = await databaseService.findBlogPostById(id);

    if (blogPost === null) {
      res.status(400).send("no_blog_post");
      return;
    }

    databaseService.countBlogAccess(id).catch(() => {
      console.log("blog_access_not_counted");
    });

    res.status(200).json(await toDTOBlogPost(blogPost));
  },
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
