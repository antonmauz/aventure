import express from "express";
import { getTrainJourneys } from "./getTrainJourneys";
import { getTrainStations } from "./getTrainStations";

const router = express.Router();

router.get("/journey", getTrainJourneys);
router.get("/station", getTrainStations);

export const trainRouter = router;
