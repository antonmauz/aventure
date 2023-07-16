import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

type Params = {
  sort: keyof DatabaseBlogPost;
  topic?: DatabaseBlogPost["topics"][number];
};

export const getAllBlogPosts = ({ sort, topic }: Params): Promise<DatabaseBlogPost[]> => {
  return MongooseBlogPost.find(topic ? { topics: { $in: [topic] } } : {}).sort(`-${sort}`);
};
