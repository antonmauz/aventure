import { databaseService } from "@services";
import { toDTOBlogPosts } from "./toDTOBlogPost";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { controller } from "../common/controller";
import { z } from "zod";

type Query = {
  searchTerm?: string;
};

type Response = DTOBlogPost[];

export const getBlogPosts = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { searchTerm }, res }) => {
    const blogPosts = await databaseService.findBlogPosts(searchTerm ?? "");

    res.status(200).json(await toDTOBlogPosts(blogPosts));
  },
  {
    querySchema: z.object({
      searchTerm: z.string().optional(),
    }),
  }
);
