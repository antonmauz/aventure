import express from "express";
import { getBlogPost } from "./getBlogPost";
import { postBlogPost } from "./postBlogPost";
import { getBlogPosts } from "./getBlogPosts";
import { postBlogComment } from "./postBlogComment";
import { authJwt } from "@middlewares";

const router = express.Router();

router.get("/:id", getBlogPost);
router.post("/:id/comment", authJwt.verifyToken, postBlogComment);
router.get("/", getBlogPosts);
router.post("/", authJwt.verifyToken, postBlogPost);

export const blogPostRouter = router;
