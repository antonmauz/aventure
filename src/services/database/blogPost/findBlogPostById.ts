import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const findBlogPostById = async (blogPostId: string): Promise<DatabaseBlogPost> => {
  const dbBlogPost = await MongooseBlogPost.findById(blogPostId).exec();

  if (!dbBlogPost) {
    console.log(`No blogPost found with the id '${blogPostId}'`);
    throw `No blogPost found with the id '${blogPostId}'`;
  }

  return dbBlogPost;
};
