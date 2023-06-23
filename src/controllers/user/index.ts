import express from "express";
import { getUser } from "./getUser";
import { patchUser } from "./patchUser";

const router = express.Router();

router.get("/", getUser);
router.put("/", patchUser);

export const userRouter = router;
