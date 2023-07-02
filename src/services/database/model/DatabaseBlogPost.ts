import { Document, model, Schema, Types } from "mongoose";
import { IUser } from "./DatabaseUser";
import { DESTINATIONS, TOPICS } from "@constants";

type Destination = (typeof DESTINATIONS)[number];

type Topic = (typeof TOPICS)[number];

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
    destinations: { type: [String], enum: DESTINATIONS, required: true },
    topics: { type: [String], enum: TOPICS, required: true },
    comments: { type: [commentSchema], required: false },
  },
  { timestamps: true }
);

export const DatabaseBlogPost = model<IBlogPost>("blogPost", blogPostSchema);
