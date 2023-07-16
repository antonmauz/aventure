import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const findBlogPostById = async (blogPostId: string): Promise<DatabaseBlogPost | null> => {
  const dbBlogPost = await MongooseBlogPost.findById(blogPostId);

  if (!dbBlogPost) {
    console.log(`No blogPost found with the id '${blogPostId}'`);
    return null;
  }

  return dbBlogPost;
};
