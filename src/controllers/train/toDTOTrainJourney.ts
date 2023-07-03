import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { databaseService } from "@services";
import { CSAConnection } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";

const mapConnection = async (connection: CSAConnection): Promise<DTOTrainJourney["connections"][number]> => {
  const departureStation = await databaseService.findTrainStationByDbStationId(
    connection.departureStation.toString()
  );
  const arrivalStation = await databaseService.findTrainStationByDbStationId(
    connection.arrivalStation.toString()
  );

  return {
    trainId: connection.trainId,
    departure: {
      trainStation: departureStation.name,
      time: new Date(),
      track: connection.departureTrackId,
    },
    arrival: {
      trainStation: arrivalStation.name,
      time: new Date(),
      track: connection.arrivalTrackId,
    },
  };
};

export const toDTOTrainJourney = async (casConnections: CSAConnection[]): Promise<DTOTrainJourney> => {
  const departureStation = await databaseService.findTrainStationByDbStationId(
    casConnections[0].departureStation.toString()
  );

  const arrivalStation = await databaseService.findTrainStationByDbStationId(
    casConnections[casConnections.length - 1].arrivalStation.toString()
  );

  return {
    departure: new Date(),
    arrival: new Date(),
    startTrainStation: departureStation.name,
    endTrainStation: arrivalStation.name,
    connections: await Promise.all(casConnections.map(mapConnection)),
    affiliateLink: "www.google.com",
  };
};
