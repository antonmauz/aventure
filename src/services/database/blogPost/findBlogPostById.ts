import { DatabaseBlogPost, IBlogPost } from "../model/DatabaseBlogPost";

export const findBlogPostById = async (blogPostId: string): Promise<IBlogPost> => {
  const dbBlogPost = await DatabaseBlogPost.findById(blogPostId).exec();

  if (!dbBlogPost) {
    console.log(`No blogPost found with the id '${blogPostId}'`);
    throw `No blogPost found with the id '${blogPostId}'`;
  }

  return dbBlogPost;
};
