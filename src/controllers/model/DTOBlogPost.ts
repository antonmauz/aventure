import { DESTINATIONS, TOPICS } from "@constants";
import { DTOAuthor } from "./common/DTOAuthor";

type Destination = (typeof DESTINATIONS)[number];

type Topic = (typeof TOPICS)[number];

interface BlogComment {
  author: DTOAuthor;
  text: string;
  createdAt: Date;
}

export interface DTOBlogPost {
  id: string;
  createdAt: Date;
  author: DTOAuthor;
  bannerImage: string;
  destinations: Destination[];
  topics: Topic[];
  title: string;
  text: string;
  views: number;
  comments: BlogComment[];
}
