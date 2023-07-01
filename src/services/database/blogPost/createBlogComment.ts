import { DatabaseBlogPost, IBlogPost } from "../model/DatabaseBlogPost";

type NewDatabaseBlogComment = Pick<IBlogPost["comments"][number], "authorId" | "text">;

export const createBlogComment = async (
  id: IBlogPost["_id"],
  newComment: NewDatabaseBlogComment
): Promise<IBlogPost> => {
  try {
    const updatedBlogPost = (await DatabaseBlogPost.findByIdAndUpdate(
      id,
      {
        $push: { comments: newComment },
      },
      { new: true }
    ))!; // TODO remove exclamation mark

    if (updatedBlogPost === null) {
      console.log(`No blogPost found with the id '${id}'`);
      // TODO throw Error(`No blogPost found with the id '${id}'`);
    }

    console.log(`BlogPost updated with the following id: ${updatedBlogPost}`);
    return updatedBlogPost;
  } catch (error) {
    console.log("BlogPost not updated", error);
    throw error;
  }
};
