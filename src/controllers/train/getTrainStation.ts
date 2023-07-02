import { databaseService } from "@services";
import { controller } from "../common/controller";
import { DTOTrainStation } from "../model/DTOTrainStation";
import { toDTOTrainStation } from "./toDTOTrainStation";
import { z } from "zod";

type Params = Pick<DTOTrainStation, "id">;

type Response = DTOTrainStation;

export const getTrainStation = controller<undefined, undefined, Params, Response>(
  async ({ params: { id }, res }) => {
    const station = await databaseService.findTrainStation(id);

    res.status(200).json(toDTOTrainStation(station));
  },
  {
    paramsSchema: z.object({
      id: z.string(),
    }),
  }
);
