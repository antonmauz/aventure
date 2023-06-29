import express from "express";
import { getRestaurants } from "./getRestaurants";

const router = express.Router();

router.get("/", getRestaurants);
//TODO postReview-route

export const restaurantRouter = router;
