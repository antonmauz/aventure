import { DTOTrainJourney } from "../model/DTOTrainJourney";
import { databaseService } from "@services";
import { CSAConnection } from "./ConnectionScanAlgorithm/ConnectionScanAlgorithm";

const mapConnection = async (
  connection: CSAConnection,
  date: Date
): Promise<DTOTrainJourney["connections"][number]> => {
  const departureStation = await databaseService.findTrainStationByCsaIndex(connection.departureStation);
  const arrivalStation = await databaseService.findTrainStationByCsaIndex(connection.arrivalStation);

  const departureDate = new Date(date.toDateString());
  departureDate.setSeconds(connection.departureTimestamp);

  const arrivalDate = new Date(date.toDateString());
  arrivalDate.setSeconds(connection.arrivalTimestamp);

  return {
    trainId: connection.trainId,
    departure: {
      trainStation: departureStation.name,
      time: departureDate,
      track: connection.departureTrackId,
    },
    arrival: {
      trainStation: arrivalStation.name,
      time: arrivalDate,
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

const toDTOTrainJourney = async (csaConnections: CSAConnection[], date: Date): Promise<DTOTrainJourney> => {
  const departureStation = await databaseService.findTrainStationByCsaIndex(
    csaConnections[0].departureStation
  );

  const arrivalStation = await databaseService.findTrainStationByCsaIndex(
    csaConnections[csaConnections.length - 1].arrivalStation
  );

  const filteredConnections = filterConnections(csaConnections);

  const departureDate = new Date(date.toDateString());
  departureDate.setSeconds(csaConnections[0].departureTimestamp);

  const arrivalDate = new Date(date.toDateString());
  arrivalDate.setSeconds(csaConnections[csaConnections.length - 1].arrivalTimestamp);

  return {
    departure: departureDate,
    arrival: arrivalDate,
    startTrainStation: departureStation.name,
    endTrainStation: arrivalStation.name,
    connections: await Promise.all(filteredConnections.map((connection) => mapConnection(connection, date))),
  };
};

export const toDTOTrainJourneys = (
  csaJourneys: CSAConnection[][],
  date: Date
): Promise<DTOTrainJourney[]> => {
  return Promise.all(csaJourneys.map((connections) => toDTOTrainJourney(connections, date)));
};
