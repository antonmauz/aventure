import { IBlogPost } from "../../services/database/model/DatabaseBlogPost";
import { databaseService } from "@services";
import { DTOBlogPost } from "../model/DTOBlogPost";

const toAuthor = async (authorId: IBlogPost["authorId"]) => {
  const { firstName, surname, disabilityVerification, profileImage } = await databaseService.findUserById(
    authorId
  );

  return {
    name: `${firstName} ${surname}`,
    isVerified: disabilityVerification?.status === "accepted" ?? false,
    profileImage,
  };
};

const toBlogComment = async ({
  authorId,
  text,
  createdAt,
}: IBlogPost["comments"][number]): Promise<DTOBlogPost["comments"][number]> => {
  const author = await toAuthor(authorId);

  return {
    text,
    author,
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
}: IBlogPost): Promise<DTOBlogPost> => {
  const author = await toAuthor(authorId);

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
    createdAt,
  };
};
