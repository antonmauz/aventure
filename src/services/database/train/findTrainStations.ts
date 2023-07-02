import { DatabaseTrainStation, ITrainStation } from "../model/DatabaseTrainStation";

export const findTrainStations = async (): Promise<ITrainStation[]> => {
  const trainStations = await DatabaseTrainStation.find().exec();

  return trainStations;
};
