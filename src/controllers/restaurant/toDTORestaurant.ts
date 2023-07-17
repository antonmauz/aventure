import { DatabaseRestaurant, DatabaseReview, databaseService } from "@services";
import { DTORestaurant } from "../model/DTORestaurant";

const toAuthor = async (authorId: DatabaseReview["authorId"]) => {
  const { firstName, surname, disabilityVerification, profileImage } = await databaseService.findUserById(
    authorId
  );

  return {
    name: `${firstName} ${surname}`,
    isVerified: disabilityVerification?.status === "accepted" ?? false,
    profileImage,
  };
};

const toReview = async ({
  authorId,
  rating,
  text,
  createdAt,
}: DatabaseRestaurant["reviews"][number]): Promise<DTORestaurant["reviews"][number]> => {
  const author = await toAuthor(authorId);
  return {
    author,
    rating,
    text,
    createdAt,
  };
};

export const toDTORestaurant = async ({
  _id,
  name,
  address,
  reviews,
  rating,
  highlights,
  isVerified,
  images,
  phoneNumber,
  cuisines,
  accessibilityAmenities,
  affiliateLink,
}: DatabaseRestaurant): Promise<DTORestaurant> => {
  const mappedReviews = await Promise.all(reviews.map(toReview));

  return {
    id: _id,
    name,
    address,
    reviews: mappedReviews,
    rating: rating ?? null,
    highlights,
    isVerified,
    images,
    phoneNumber,
    cuisines,
    accessibilityAmenities,
    affiliateLink,
  };
};
