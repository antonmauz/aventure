import express from "express";
import { getBlogPost } from "./getBlogPost";
import { postBlogPost } from "./postBlogPost";
import { getBlogPosts } from "./getBlogPosts";
import { postBlogComment } from "./postBlogComment";
import { handleAuthentication } from "@middlewares";
import { getRecentBlogPosts } from "./getRecentBlogPosts";
import { getTrendingBlogPosts } from "./getTrendingBlogPosts";
import { deleteBlogPost } from "./deleteBlogPost";

const router = express.Router();

router.get("/trending", getTrendingBlogPosts);
router.get("/recent", getRecentBlogPosts);
router.get("/:id", getBlogPost);
router.get("/", getBlogPosts);

router.use(handleAuthentication);
router.post("/:id/comment", postBlogComment);
router.post("/", postBlogPost);
router.delete("/:id", deleteBlogPost);

export const blogPostRouter = router;
