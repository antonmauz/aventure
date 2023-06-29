import { IHotel, IReview } from "../../services/database/model/DatabaseHotel";
import { databaseService } from "@services";
import { DTOHotel } from "../model/DTOHotel";

const toAuthor = async (authorId: IReview["authorId"]) => {
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
}: IHotel["reviews"][number]): Promise<DTOHotel["reviews"][number]> => {
  const author = await toAuthor(authorId);
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
}: IHotel): Promise<DTOHotel> => {
  const mappedReviews = await Promise.all(reviews.map(toReview));

  return {
    id: _id,
    name,
    address,
    reviews: mappedReviews,
    stars,
    rating,
    highlights,
    isVerified,
    images,
    phoneNumber,
    accessibilityAmenities,
    amenities,
    affiliateLink,
  };
};
