import { DTOUser } from "./DTOUser";

type Destination = "munich" | "hamburg" | "frankfurt" | "stuttgart" | "berlin" | "other";

type Topic = "trainTravel" | "hotel" | "restaurant" | "city" | "countrySide" | "adventure" | "other";

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
