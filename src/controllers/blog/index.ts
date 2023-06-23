import express from "express";
import { getBlogPost } from "./getBlogPost";
import { postBlogPost } from "./postBlogPost";
import { getBlogPosts } from "./getBlogPosts";

const router = express.Router();

router.get("/:id", getBlogPost);
router.get("/", getBlogPosts);
router.post("/", postBlogPost);

export const blogPostRouter = router;
