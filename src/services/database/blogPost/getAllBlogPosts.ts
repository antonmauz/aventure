import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

type Sort = keyof DatabaseBlogPost;

export const getAllBlogPosts = (sort?: Sort): Promise<DatabaseBlogPost[]> => {
  return MongooseBlogPost.find().sort(`-${sort}`);
};
