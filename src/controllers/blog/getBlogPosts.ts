import { databaseService } from "@services";
import { toDTOBlogPost } from "./toDTOBlogPost";
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

    const mappedBlogPosts = await Promise.all(blogPosts.map(toDTOBlogPost));

    res.status(200).json(mappedBlogPosts);
  },
  {
    querySchema: z.object({
      title: z.string().optional(),
    }),
  }
);
