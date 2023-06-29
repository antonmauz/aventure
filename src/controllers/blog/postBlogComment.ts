import { databaseService } from "@services";
import express from "express";
import { AuthenticatedRequest } from "../model/AuthenticatedRequest";

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

    await databaseService.createBlogComment(blogPostId, { authorId: userId, ...newBlogComment });

    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
};
