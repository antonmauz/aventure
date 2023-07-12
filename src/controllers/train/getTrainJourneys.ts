import { controller } from "../common/controller";
import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { CSA } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";
import { z } from "zod";
import { databaseService } from "@services";
import { toDTOTrainJourneys } from "./toDTOTrainJourney";

const csa = new CSA();

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

    const seconds = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;

    const result = csa.getFastestRoutes(departureStation.csaIndex, arrivalStation.csaIndex, seconds, 5);

    if (result === "no_solution") {
      res.status(200).json([]);
      return;
    }

    //TODO add more results
    /*const resultTwo = csa.getFastestRoutes(
      departureStation.csaIndex,
      arrivalStation.csaIndex,
      result[0][0].departureTimestamp + 1,
      5
    );

    const resultCombined = resultTwo === "no_solution" ? result : [...result, ...resultTwo]; */

    res.status(200).json(await toDTOTrainJourneys(result));
  },
  {
    querySchema: z.object({
      departureStationId: z.string(),
      arrivalStationId: z.string(),
      date: z.string().transform((date) => new Date(date)),
    }),
  }
);
