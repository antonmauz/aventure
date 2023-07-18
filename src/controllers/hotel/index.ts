import express from "express";
import { getHotel } from "./getHotel";
import { getHotels } from "./getHotels";
import { postHotelReview } from "./postHotelReview";
import { handleAuthentication } from "@middlewares";
import { getHotelNames } from "./getHotelNames";

const router = express.Router();

router.get("/names", getHotelNames);
router.get("/:id", getHotel);
router.get("/", getHotels);

router.use(handleAuthentication);
router.post("/:id/review", postHotelReview);

export const hotelRouter = router;
