import { DatabaseReview, databaseService } from "@services";

export const toDTOAuthor = async (authorId: DatabaseReview["authorId"]) => {
  const { firstName, surname, disabilityVerification, profileImage } = await databaseService.findUserById(
    authorId
  );

  return {
    name: `${firstName} ${surname}`,
    isVerified: disabilityVerification?.status === "accepted" ?? false,
    profileImage,
  };
};
