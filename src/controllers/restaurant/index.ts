import express from "express";
import { getRestaurants } from "./getRestaurants";

const router = express.Router();

router.get("/", getRestaurants);

export const restaurantRouter = router;
