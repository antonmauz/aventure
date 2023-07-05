import { DatabaseTrainStation, MongooseTrainStation } from "../model/MongooseTrainStation";

export const findTrainStations = async (): Promise<DatabaseTrainStation[]> => {
  const trainStations = await MongooseTrainStation.find().exec();

  return trainStations;
};
