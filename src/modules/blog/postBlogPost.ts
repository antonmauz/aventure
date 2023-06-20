import { databaseService } from "@services";
import express from "express";

export const postBlogPost = async (req: express.Request, res: express.Response) => {
  try {
    const newBlogPost = req.body;

    // TODO add correct authorId from request-headers
    await databaseService.createBlogPost({ authorId: "6477ab32dc16db4720ff37c2", ...newBlogPost });

    res.status(200).send("OK");
  } catch (error) {
    res.status(400).send(error);
  }
};
