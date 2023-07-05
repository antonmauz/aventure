import express from "express";
import { getRestaurant } from "./getRestaurant";
import { getRestaurants } from "./getRestaurants";
import { handleAuthentication } from "@middlewares";
import { postRestaurantReview } from "./postRestaurantReview";

const router = express.Router();

router.get("/:id", getRestaurant);
router.get("/", getRestaurants);

router.use(handleAuthentication);
router.post("/:id/review", postRestaurantReview);

export const restaurantRouter = router;
