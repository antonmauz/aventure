import express from "express";
import { getHotel } from "./getHotel";
import {getHotels} from "./getHotels"


const router = express.Router();


router.get("/:id", getHotel);
router.get("/", getHotels);


export const HotelRouter = router;
