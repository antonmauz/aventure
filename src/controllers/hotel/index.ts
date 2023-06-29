import express from "express";
import { getHotel } from "./getHotel";
import { getHotels } from "./getHotels";
import { authJwt } from "@middlewares";
import { postHotelReview } from "./postHotelReview";

const router = express.Router();

router.get("/:id", getHotel);
router.post("/:id/review", authJwt.verifyToken, postHotelReview);
router.get("/", getHotels);

export const hotelRouter = router;
