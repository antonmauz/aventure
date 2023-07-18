import express from "express";
import { getRestaurant } from "./getRestaurant";
import { getRestaurants } from "./getRestaurants";
import { handleAuthentication } from "@middlewares";
import { postRestaurantReview } from "./postRestaurantReview";
import { getRestaurantNames } from "./getRestaurantNames";

const router = express.Router();

router.get("/names", getRestaurantNames);
router.get("/:id", getRestaurant);
router.get("/", getRestaurants);

router.use(handleAuthentication);
router.post("/:id/review", postRestaurantReview);

export const restaurantRouter = router;
