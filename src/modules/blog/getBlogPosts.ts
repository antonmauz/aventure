import { databaseService } from "@services";
import express from "express";
import { toDTOBlogPost } from "./toDTOBlogPost";

export const getBlogPosts = async (req: express.Request, res: express.Response) => {
  const title = req.query.title;

  if (typeof title !== "string") {
    res.status(400).send("error");
    return;
  }

  const blogPosts = await databaseService.findBlogPostsByTitle(title);

  const mappedBlogPosts = await Promise.all(blogPosts.map(toDTOBlogPost));

  res.status(200).json(mappedBlogPosts);
};
