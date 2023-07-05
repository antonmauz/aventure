import { Document, model, Schema, Types } from "mongoose";
import { DatabaseUser } from "./MongooseUser";
import { DESTINATIONS, TOPICS } from "@constants";

type Destination = (typeof DESTINATIONS)[number];

type Topic = (typeof TOPICS)[number];

interface DatabaseBlogComment extends Document {
  authorId: DatabaseUser["_id"];
  text: string;
  createdAt: Date;
}

const commentSchema = new Schema<DatabaseBlogComment>(
  {
    authorId: { type: Types.ObjectId, ref: "user", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

export interface DatabaseBlogPost extends Document {
  authorId: DatabaseUser["_id"];
  title: string;
  text: string;
  bannerImage: string;
  destinations: Destination[];
  topics: Topic[];
  comments: DatabaseBlogComment[];
  createdAt: Date;
}

const blogPostSchema = new Schema<DatabaseBlogPost>(
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

export const MongooseBlogPost = model<DatabaseBlogPost>("blogPost", blogPostSchema);
