import express from "express";
import { signIn } from "./signIn";
import { signUp } from "./signUp";
import { verifySignUp } from "@middlewares";

const router = express.Router();

router.post("/signUp", verifySignUp.checkDuplicateEmail, signUp);
router.post("/signIn", signIn);

export const authenticationRouter = router;
