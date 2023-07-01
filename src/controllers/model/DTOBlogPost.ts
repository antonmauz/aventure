import { DTOUser } from "./DTOUser";
import { DESTINATIONS, TOPICS } from "@constants";

type Destination = (typeof DESTINATIONS)[number];

type Topic = (typeof TOPICS)[number];

interface Author {
  name: string;
  isVerified: boolean;
  profileImage?: DTOUser["profileImage"];
}

interface BlogComment {
  author: Author;
  text: string;
  createdAt: Date;
}

export interface DTOBlogPost {
  id: string;
  createdAt: Date;
  author: Author;
  bannerImage: string;
  destinations: Destination[];
  topics: Topic[];
  title: string;
  text: string;
  comments: BlogComment[];
}
