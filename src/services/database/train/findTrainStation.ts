import { DatabaseTrainStation, MongooseTrainStation } from "../model/MongooseTrainStation";

export const findTrainStation = async (id: DatabaseTrainStation["_id"]): Promise<DatabaseTrainStation> => {
  const trainStation = await MongooseTrainStation.findById(id).exec();

  if (!trainStation) {
    throw Error("no_train_station_found");
  }

  return trainStation;
};

export const findTrainStationByDbStationId = async (
  dbStationId: DatabaseTrainStation["dbStationId"]
): Promise<DatabaseTrainStation> => {
  const trainStation = await MongooseTrainStation.findOne({ dbStationId }).exec();

  if (!trainStation) {
    throw Error("no_train_station_found");
  }

  return trainStation;
};
