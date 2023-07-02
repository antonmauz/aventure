import { ITrainStation } from "../../services/database/model/DatabaseTrainStation";
import { DTOTrainStation } from "../model/DTOTrainStation";

export const toDTOTrainStation = ({
  _id,
  name,
  dbStationId,
  dbEvaNumber,
  address,
}: ITrainStation): DTOTrainStation => ({
  id: _id,
  name,
  dbStationId,
  dbEvaNumber,
  address,
});

export const toDTOTrainStations = (stations: ITrainStation[]): DTOTrainStation[] => {
  return stations.map((station) => toDTOTrainStation(station));
};
