import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { databaseService } from "@services";
import { CSAConnection } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";

const mapConnection = async (connection: CSAConnection): Promise<DTOTrainJourney["connections"][number]> => {
  const departureStation = await databaseService.findTrainStationByCsaIndex(connection.departureStation);
  const arrivalStation = await databaseService.findTrainStationByCsaIndex(connection.arrivalStation);

  return {
    trainId: connection.trainId,
    departure: {
      trainStation: departureStation.name,
      time: new Date(connection.departureTimestamp * 1000),
      track: connection.departureTrackId,
    },
    arrival: {
      trainStation: arrivalStation.name,
      time: new Date(connection.arrivalTimestamp * 1000),
      track: connection.arrivalTrackId,
    },
  };
};

const filterConnections = (csaConnections: CSAConnection[]): CSAConnection[] => {
  let currentConnection = csaConnections[0];

  return csaConnections
    .map((connection, index) => {
      if (index === csaConnections.length - 1) {
        return {
          trainId: currentConnection.trainId,
          departureStation: currentConnection.departureStation,
          departureTrackId: currentConnection.departureTrackId,
          departureTimestamp: currentConnection.departureTimestamp,
          arrivalStation: connection.arrivalStation,
          arrivalTrackId: connection.arrivalTrackId,
          arrivalTimestamp: connection.arrivalTimestamp,
        };
      }

      const nextConnection = csaConnections[index + 1];

      if (currentConnection.trainId === nextConnection.trainId) {
        return null;
      }

      const result = {
        trainId: currentConnection.trainId,
        departureStation: currentConnection.departureStation,
        departureTrackId: currentConnection.departureTrackId,
        departureTimestamp: currentConnection.departureTimestamp,
        arrivalStation: connection.arrivalStation,
        arrivalTrackId: connection.arrivalTrackId,
        arrivalTimestamp: connection.arrivalTimestamp,
      };

      currentConnection = nextConnection;

      return result;
    })
    .filter((connection: CSAConnection | null) => connection !== null) as CSAConnection[];
};

const toDTOTrainJourney = async (csaConnections: CSAConnection[]): Promise<DTOTrainJourney> => {
  const departureStation = await databaseService.findTrainStationByCsaIndex(
    csaConnections[0].departureStation
  );

  const arrivalStation = await databaseService.findTrainStationByCsaIndex(
    csaConnections[csaConnections.length - 1].arrivalStation
  );

  const filteredConnections = filterConnections(csaConnections);

  return {
    departure: new Date(csaConnections[0].departureTimestamp * 1000),
    arrival: new Date(csaConnections[csaConnections.length - 1].arrivalTimestamp * 1000),
    startTrainStation: departureStation.name,
    endTrainStation: arrivalStation.name,
    connections: await Promise.all(filteredConnections.map(mapConnection)),
    affiliateLink: "www.google.com",
  };
};

export const toDTOTrainJourneys = (csaJourneys: CSAConnection[][]): Promise<DTOTrainJourney[]> => {
  return Promise.all(csaJourneys.map(toDTOTrainJourney));
};
