import express from "express";
import { getTrainJourneys } from "./getTrainJourneys";
import { getTrainStations } from "./getTrainStations";
import { getTrainStation } from "./getTrainStation";

const router = express.Router();

router.get("/journey", getTrainJourneys);
router.get("/station", getTrainStations);
router.get("/station/:id", getTrainStation);

export const trainRouter = router;
