import express from "express";
import { getUser } from "./getUser";
import { patchUser } from "./patchUser";
import { handleAuthentication } from "@middlewares";

const router = express.Router();

router.use(handleAuthentication);
router.get("/", getUser);
router.put("/", patchUser);

export const userRouter = router;
