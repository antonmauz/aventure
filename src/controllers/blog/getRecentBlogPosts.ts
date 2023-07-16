import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { toDTOBlogPosts } from "./toDTOBlogPost";

type Response = DTOBlogPost[];

export const getRecentBlogPosts = controller<undefined, undefined, undefined, Response>(async ({ res }) => {
  const blogposts = await databaseService.getAllBlogPosts({ sort: "createdAt" });

  const recentBlogPosts = blogposts.slice(0, 5);

  res.status(200).json(await toDTOBlogPosts(recentBlogPosts));
});
