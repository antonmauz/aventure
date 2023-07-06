import { DTOAddress } from "./common/DTOAddress";

export interface DTOTrainStation {
  name: string;
  id: string;
  dbStationId: string;
  dbEvaNumber: number;
  address: DTOAddress;
}
