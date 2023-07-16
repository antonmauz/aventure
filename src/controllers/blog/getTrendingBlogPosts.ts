import { controller } from "../common/controller";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { DatabaseBlogPost, databaseService } from "@services";
import { toDTOBlogPosts } from "./toDTOBlogPost";
import { z } from "zod";
import { TOPICS } from "@constants";

type Query = {
  topic?: DatabaseBlogPost["topics"][number];
};

type Response = DTOBlogPost[];

export const getTrendingBlogPosts = controller<undefined, undefined, undefined, Response, Query>(
  async ({ res, query: { topic } }) => {
    const blogposts = await databaseService.getAllBlogPosts({ sort: "accessCounter", topic });

    const trendingBlogPosts = blogposts.slice(0, 5);

    res.status(200).json(await toDTOBlogPosts(trendingBlogPosts));
  },
  {
    querySchema: z.object({
      topic: z.enum(TOPICS).optional(),
    }),
  }
);
