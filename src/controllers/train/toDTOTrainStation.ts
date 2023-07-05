import { DatabaseTrainStation } from "@services";
import { DTOTrainStation } from "../model/DTOTrainStation";

export const toDTOTrainStation = ({
  _id,
  name,
  dbStationId,
  dbEvaNumber,
  address,
}: DatabaseTrainStation): DTOTrainStation => ({
  id: _id,
  name,
  dbStationId,
  dbEvaNumber,
  address,
});

export const toDTOTrainStations = (stations: DatabaseTrainStation[]): DTOTrainStation[] => {
  return stations.map((station) => toDTOTrainStation(station));
};
