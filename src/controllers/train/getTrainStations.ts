import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOTrainStation } from "../model/DTOTrainStation";
import { toDTOTrainStations } from "./toDTOTrainStation";

type Response = DTOTrainStation[];

export const getTrainStations = controller<undefined, undefined, undefined, Response>(async ({ res }) => {
  const locations = await databaseService.findTrainStations();

  res.status(200).json(toDTOTrainStations(locations));
});
