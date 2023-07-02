import { DatabaseTrainStation, ITrainStation } from "../model/DatabaseTrainStation";

export const findTrainStation = async (id: ITrainStation["_id"]): Promise<ITrainStation> => {
  const trainStation = await DatabaseTrainStation.findById(id).exec();

  if (!trainStation) {
    throw Error("no_train_station_found");
  }

  return trainStation;
};
