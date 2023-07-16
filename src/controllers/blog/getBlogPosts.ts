import { databaseService } from "@services";
import { toDTOBlogPosts } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { controller } from "../common/controller";
import { z } from "zod";

type Query = {
  title?: string;
};

type Response = DTOBlogPost[];

export const getBlogPosts = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { title }, res }) => {
    const blogPosts = await databaseService.findBlogPosts(title ?? "");

    res.status(200).json(await toDTOBlogPosts(blogPosts));
  },
  {
    querySchema: z.object({
      title: z.string().optional(),
    }),
  }
);
