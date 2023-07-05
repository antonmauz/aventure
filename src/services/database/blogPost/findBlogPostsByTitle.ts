import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const findBlogPostsByTitle = async (title: string): Promise<DatabaseBlogPost[]> => {
  const dbBlogPosts = await MongooseBlogPost.find({
    title: { $regex: title, $options: "i" },
  }).exec();

  return dbBlogPosts;
};
