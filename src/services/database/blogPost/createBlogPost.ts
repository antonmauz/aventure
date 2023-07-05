import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

type NewDatabaseBlogPost = Pick<
  DatabaseBlogPost,
  "authorId" | "title" | "text" | "bannerImage" | "destinations" | "topics"
>;

export const createBlogPost = async (newBlogPost: NewDatabaseBlogPost): Promise<DatabaseBlogPost> => {
  try {
    const createdBlogPost = await MongooseBlogPost.create(newBlogPost);

    console.log(`New blogPost created with the following id: ${createdBlogPost}`);
    return createdBlogPost;
  } catch (error) {
    console.log("No new blogPost created", error);
    throw error;
  }
};
