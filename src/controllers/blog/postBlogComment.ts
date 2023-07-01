import { databaseService } from "@services";
import express from "express";
import { AuthenticatedRequest } from "../model/AuthenticatedRequest";
import { toDTOBlogPost } from "./toDTOBlogPost";

export const postBlogComment = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    const { userId } = req;
    const blogPostId = req.params.id;
    const newBlogComment = req.body;
    console.log(req);

    if (typeof userId !== "string") {
      // TODO better error mapping
      res.status(400).send("no user id provided");
      return;
    }

    const updatedBlogPost = await databaseService.createBlogComment(blogPostId, {
      authorId: userId,
      ...newBlogComment,
    });

    res.status(200).send(await toDTOBlogPost(updatedBlogPost));
  } catch (error) {
    res.status(400).send(error);
  }
};
