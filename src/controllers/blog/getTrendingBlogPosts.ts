import { controller } from "../common/controller";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { databaseService } from "@services";
import { toDTOBlogPosts } from "./toDTOBlogPost";

type Response = DTOBlogPost[];

export const getTrendingBlogPosts = controller<undefined, undefined, undefined, Response>(async ({ res }) => {
  const blogposts = await databaseService.getAllBlogPosts("accessCounter");

  const trendingBLogPosts = blogposts.slice(0, 5);
  
  res.status(200).json(await toDTOBlogPosts(trendingBLogPosts));
});
