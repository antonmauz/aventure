import { model, Schema, Types, Document } from "mongoose";
import { IUser } from "./DatabaseUser";

const CITIES = ["munich", "hamburg", "frankfurt", "stuttgart", "berlin", "other"] as const;

const TAGS = ["trainTravel", "hotel", "restaurant", "city", "countrySide", "adventure", "other"] as const;

type Destination = (typeof CITIES)[number];

type Topic = (typeof TAGS)[number];

interface IBlogComment extends Document {
  authorId: IUser["_id"];
  text: string;
  createdAt: Date;
}

const commentSchema = new Schema<IBlogComment>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export interface IBlogPost extends Document {
  authorId: IUser["_id"];
  title: string;
  text: string;
  bannerImage: string;
  destinations: Destination[];
  topics: Topic[];
  comments: IBlogComment[];
  createdAt: Date;
}

const blogPostSchema = new Schema<IBlogPost>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    title: { type: String, required: true },
    text: { type: String, required: true },
    bannerImage: { type: String, required: true },
    destinations: { type: [String], enum: CITIES, required: true },
    topics: { type: [String], enum: TAGS, required: true },
    comments: { type: [commentSchema], required: false },
  },
  { timestamps: true }
);

export const DatabaseBlogPost = model<IBlogPost>("blogPost", blogPostSchema);
