import { controller } from "../common/controller";
import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { CSA } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";
import { z } from "zod";
import { databaseService } from "@services";
import { transformTrainJourneys } from "./ConnectionScanAlgorithm/transformTrainJourneys";
import { toDTOTrainJourney } from "./toDTOTrainJourney";

const csa = new CSA(transformTrainJourneys());

type Query = {
  departureStationId: string;
  arrivalStationId: string;
  date: Date;
};

type Response = DTOTrainJourney[] | "no_solution_found";

export const getTrainJourneys = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { departureStationId, arrivalStationId, date }, res }) => {
    const departureStation = await databaseService.findTrainStation(departureStationId);
    const arrivalStation = await databaseService.findTrainStation(arrivalStationId);

    const result = csa.compute(
      parseInt(departureStation.dbStationId),
      parseInt(arrivalStation.dbStationId),
      0 // TODO add date
    );

    if (result === "no_solution") {
      res.status(400).send("no_solution_found");
      return;
    }

    console.log(result);

    res.status(200).json([await toDTOTrainJourney(result)]);
  },
  {
    querySchema: z.object({
      departureStationId: z.string(),
      arrivalStationId: z.string(),
      date: z.string().transform((date) => new Date(date)),
    }),
  }
);
