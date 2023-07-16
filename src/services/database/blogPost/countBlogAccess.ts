import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const countBlogAccess = async (id: DatabaseBlogPost["_id"]) => {
  const blogPost = await MongooseBlogPost.findById(id);

  if (!blogPost) {
    throw "no_blog_post";
  }

  const newAccessCounter = blogPost.accessCounter + 1;

  await MongooseBlogPost.findByIdAndUpdate(id, {
    $set: {
      accessCounter: newAccessCounter,
    },
  });
};
