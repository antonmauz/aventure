import express from "express";
import { getRestaurant } from "./getRestaurant";
import { getRestaurants } from "./getRestaurants";
import { handleAuthentication } from "@middlewares";

const router = express.Router();

router.get("/:id", getRestaurant);
router.get("/", getRestaurants);

router.use(handleAuthentication);

export const restaurantRouter = router;
