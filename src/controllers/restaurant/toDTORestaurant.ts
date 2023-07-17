import { DatabaseRestaurant } from "@services";
import { DTORestaurant } from "../model/DTORestaurant";
import { toDTOAuthor } from "../common/toDTOAuthor";

const toReview = async ({
  authorId,
  rating,
  text,
  createdAt,
}: DatabaseRestaurant["reviews"][number]): Promise<DTORestaurant["reviews"][number]> => {
  const author = await toDTOAuthor(authorId);

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
