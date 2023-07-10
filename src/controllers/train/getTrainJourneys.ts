import { controller } from "../common/controller";
import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { CSA } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";
import { z } from "zod";
import { databaseService } from "@services";
import { transformTrainJourneys } from "./ConnectionScanAlgorithm/transformTrainJourneys";
import { toDTOTrainJourneys } from "./toDTOTrainJourney";

const csa = new CSA(transformTrainJourneys());

type Query = {
  departureStationId: string;
  arrivalStationId: string;
  date: Date;
};

type Response = DTOTrainJourney[] | "no_solution";

export const getTrainJourneys = controller<undefined, undefined, undefined, Response, Query>(
  async ({ query: { departureStationId, arrivalStationId, date }, res }) => {
    const departureStation = await databaseService.findTrainStation(departureStationId);
    const arrivalStation = await databaseService.findTrainStation(arrivalStationId);

    const result = csa.getFastestRoutes(
      parseInt(departureStation.dbStationId),
      parseInt(arrivalStation.dbStationId),
      0,
      10
    );

    if (result === "no_solution") {
      res.status(200).json([]);
      return;
    }

    const resultTwo = csa.getFastestRoutes(
      parseInt(departureStation.dbStationId),
      parseInt(arrivalStation.dbStationId),
      result[0][0].departureTimestamp + 1,
      10
    );

    const resultCombined = resultTwo === "no_solution" ? result : [...result, ...resultTwo];

    res.status(200).json(await toDTOTrainJourneys(resultCombined));
  },
  {
    querySchema: z.object({
      departureStationId: z.string(),
      arrivalStationId: z.string(),
      date: z.string().transform((date) => new Date(date)),
    }),
  }
);
