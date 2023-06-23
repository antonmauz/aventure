import { databaseService } from "@services";
import express from "express";
import { toDTOBlogPost } from "./toDTOBlogPost";

export const getBlogPost = async (req: express.Request, res: express.Response) => {
  const blogPostId = req.params.id;

  const blogPost = await databaseService.findBlogPostById(blogPostId);

  // handle not found in DB
  // res.status(400).send(error);

  res.status(200).json(await toDTOBlogPost(blogPost));
};
