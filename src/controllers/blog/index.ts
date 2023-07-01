import express from "express";
import { getBlogPost } from "./getBlogPost";
import { postBlogPost } from "./postBlogPost";
import { getBlogPosts } from "./getBlogPosts";
import { postBlogComment } from "./postBlogComment";
import { handleAuthentication } from "@middlewares";

const router = express.Router();

router.get("/:id", getBlogPost);
router.get("/", getBlogPosts);

router.use(handleAuthentication);
router.post("/:id/comment", postBlogComment);
router.post("/", postBlogPost);

export const blogPostRouter = router;
