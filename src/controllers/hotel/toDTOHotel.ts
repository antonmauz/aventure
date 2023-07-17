import { DatabaseHotel } from "@services";
import { DTOHotel } from "../model/DTOHotel";
import { toDTOAuthor } from "../common/toDTOAuthor";

const toReview = async ({
  authorId,
  rating,
  text,
  createdAt,
}: DatabaseHotel["reviews"][number]): Promise<DTOHotel["reviews"][number]> => {
  const author = await toDTOAuthor(authorId);

  return {
    author,
    rating,
    text,
    createdAt,
  };
};

export const toDTOHotel = async ({
  _id,
  name,
  address,
  reviews,
  stars,
  rating,
  highlights,
  isVerified,
  images,
  phoneNumber,
  accessibilityAmenities,
  amenities,
  affiliateLink,
}: DatabaseHotel): Promise<DTOHotel> => {
  const mappedReviews = await Promise.all(reviews.map(toReview));

  return {
    id: _id,
    name,
    address,
    reviews: mappedReviews,
    stars,
    rating: rating ?? null,
    highlights,
    isVerified,
    images,
    phoneNumber,
    accessibilityAmenities,
    amenities,
    affiliateLink,
  };
};
