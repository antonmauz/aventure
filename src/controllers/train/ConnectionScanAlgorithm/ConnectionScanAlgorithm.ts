import { transformTrainJourneys } from "./transformTrainJourneys";

export class CSAConnection {
  trainId: string;
  departureStation: number;
  departureTrackId: string;
  departureTimestamp: number;
  arrivalStation: number;
  arrivalTrackId: string;
  arrivalTimestamp: number;

  constructor({
    trainId,
    departureStation,
    departureTrackId,
    arrivalStation,
    arrivalTrackId,
    departureTimestamp,
    arrivalTimestamp,
  }: CSAConnection) {
    this.trainId = trainId;
    this.departureStation = departureStation;
    this.departureTrackId = departureTrackId;
    this.departureTimestamp = departureTimestamp;
    this.arrivalStation = arrivalStation;
    this.arrivalTrackId = arrivalTrackId;
    this.arrivalTimestamp = arrivalTimestamp;
  }
}

class Timetable {
  connections: CSAConnection[];

  constructor(connections: CSAConnection[]) {
    this.connections = connections.map((connection) => new CSAConnection(connection));
  }
}

interface EarliestArrival {
  timestamp: number;
  inConnections: CSAConnection[];
}

export class CSA {
  private timetable: Timetable;
  private earliestArrival: EarliestArrival[];

  constructor() {
    this.timetable = new Timetable([]);
    this.earliestArrival = [];

    //TODO add this back in
    Promise.resolve(transformTrainJourneys()).then((connections) => {
      console.log("CSA connections", connections.length);
      this.timetable = new Timetable(connections);
      this.earliestArrival = [];

      return this;
    });
  }

  updateEarliestArrival(stationIndex: number, arrival: EarliestArrival) {
    this.earliestArrival[stationIndex] = {
      timestamp: arrival.timestamp,
      inConnections: arrival.inConnections,
    };
  }

  mainLoop() {
    const THIRTY_MINUTES = 30 * 60;

    for (let connection of this.timetable.connections) {
      const earliestArrivalDeparture = this.earliestArrival[connection.departureStation];
      const earliestArrivalDepartureInConnections =
        this.earliestArrival[connection.departureStation].inConnections;

      const needsAdditionalTime =
        earliestArrivalDepartureInConnections.length > 0
          ? connection.trainId !==
            earliestArrivalDepartureInConnections[earliestArrivalDepartureInConnections.length - 1].trainId
          : false;

      const transferTime = needsAdditionalTime ? THIRTY_MINUTES : 0;

      if (
        connection.departureTimestamp >= earliestArrivalDeparture.timestamp + transferTime &&
        connection.arrivalTimestamp < this.earliestArrival[connection.arrivalStation].timestamp
      ) {
        const arrivalCopy = this.earliestArrival[connection.arrivalStation];
        const newInConnections = [...arrivalCopy.inConnections, connection];

        this.updateEarliestArrival(connection.arrivalStation, {
          timestamp: connection.arrivalTimestamp,
          inConnections: newInConnections,
        });
      }
    }
  }

  getFastestRoutes(
    departureStation: number,
    arrivalStation: number,
    departureTimestamp: number,
    numRoutes: number
  ): CSAConnection[][] | "no_solution" {
    const MAX_STATIONS = 250;

    this.earliestArrival = new Array(MAX_STATIONS).fill({
      timestamp: Number.MAX_VALUE,
      inConnections: [],
    });

    this.earliestArrival[departureStation] = {
      timestamp: departureTimestamp,
      inConnections: [],
    };

    for (let i = 0; i < numRoutes; i++) {
      this.mainLoop();
    }

    const result = this.earliestArrival[arrivalStation].inConnections;

    if (result.length === 0) {
      return "no_solution";
    }

    const routes: CSAConnection[][] = [];

    for (let route of result) {
      const journey: CSAConnection[] = [];
      let currentConnection: CSAConnection | null = route;

      while (currentConnection !== null) {
        journey.push(currentConnection);
        currentConnection =
          this.earliestArrival[currentConnection.departureStation].inConnections.find(
            (connection) =>
              connection.arrivalStation === currentConnection?.departureStation &&
              connection.arrivalTimestamp < currentConnection?.departureTimestamp
          ) ?? null;
      }

      journey.reverse();
      routes.push(journey);
    }

    return routes.sort((a, b) => a[a.length - 1].arrivalTimestamp - b[b.length - 1].arrivalTimestamp);
  }
}
