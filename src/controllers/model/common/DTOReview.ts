import { DTOAuthor } from "./DTOAuthor";

export interface DTOReview {
  author: DTOAuthor;
  rating: number;
  text: string;
  createdAt: Date;
}
