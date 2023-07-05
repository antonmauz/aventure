import express from "express";
import { postAccessibilityVerification } from "./postAccessibilityVerification";
import { handleAuthentication } from "@middlewares";

const router = express.Router();

router.use(handleAuthentication);
router.post("/", postAccessibilityVerification);

export const verificationRouter = router;
