import { DatabaseBlogPost, MongooseBlogPost } from "../model/MongooseBlogPost";

export const deleteBlogPost = async (id: DatabaseBlogPost["_id"]) => {
  try {
    const result = await MongooseBlogPost.deleteOne({ _id: id });

    if (result.acknowledged) {
      console.log(`BlogPost deleted with the following id: ${id}`);
      return "OK";
    } else {
      console.log(`BlogPost not deleted with the following id: ${id}`);
      return "not_deleted";
    }
  } catch (error) {
    console.log("not_deleted", error);
    throw error;
  }
};
