import { DatabaseBlogPost, IBlogPost } from "../model/DatabaseBlogPost";

export const findBlogPostsByTitle = async (title: string): Promise<IBlogPost[]> => {
  const dbBlogPosts = await DatabaseBlogPost.find({
    title: { $regex: title, $options: "i" },
  }).exec();

  return dbBlogPosts;
};
