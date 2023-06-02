import express from "express";
import { getUser } from "./getUser";
import { patchUser } from "./patchUser";
import { postUser } from "./postUser";

const router = express.Router();

router.get("/", getUser);
router.post("/", postUser);
router.put("/", patchUser);

export const userRouter = router;
