import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const findBlogPosts = async (searchTerm: string): Promise<DatabaseBlogPost[]> => {
  const dbBlogPosts = await MongooseBlogPost.find()
    .or([
      {
        title: { $regex: searchTerm, $options: "i" },
      },
      {
        destinations: {
          $elemMatch: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      },
      {
        topics: {
          $elemMatch: {
            $regex: searchTerm,
            $options: "i",
          },
        },
      },
    ])
    .exec();

  return dbBlogPosts;
};
