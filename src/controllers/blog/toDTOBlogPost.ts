import { DatabaseBlogPost } from "@services";
import { DTOBlogPost } from "../model/DTOBlogPost";
import { toDTOAuthor } from "../common/toDTOAuthor";

const toBlogComment = async ({
  authorId,
  text,
  createdAt,
}: DatabaseBlogPost["comments"][number]): Promise<DTOBlogPost["comments"][number]> => {
  const author = await toDTOAuthor(authorId);

  return {
    author,
    text,
    createdAt,
  };
};

export const toDTOBlogPost = async ({
  _id,
  authorId,
  text,
  title,
  bannerImage,
  topics,
  destinations,
  comments,
  createdAt,
  accessCounter,
}: DatabaseBlogPost): Promise<DTOBlogPost> => {
  const author = await toDTOAuthor(authorId);

  const mappedComments = await Promise.all(comments.map(toBlogComment));

  return {
    id: _id,
    bannerImage,
    text,
    title,
    topics,
    destinations,
    author,
    comments: mappedComments,
    views: accessCounter,
    createdAt,
  };
};

export const toDTOBlogPosts = (blogPosts: DatabaseBlogPost[]) => Promise.all(blogPosts.map(toDTOBlogPost));
