import express from "express";
import { getUser } from "./getUser";
import { patchUser } from "./patchUser";
import { handleAuthentication } from "@middlewares";
import { deleteUser } from "./deleteUser";

const router = express.Router();

router.use(handleAuthentication);
router.get("/", getUser);
router.patch("/", patchUser);
router.delete("/", deleteUser);

export const userRouter = router;
