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

  constructor(connections: CSAConnection[]) {
    this.timetable = new Timetable(connections);
    this.earliestArrival = [];
  }

  mainLoop() {
    for (let connection of this.timetable.connections) {
      if (
        connection.departureTimestamp >= this.earliestArrival[connection.departureStation].timestamp &&
        connection.arrivalTimestamp < this.earliestArrival[connection.arrivalStation].timestamp
      ) {
        const arrivalCopy = { ...this.earliestArrival[connection.arrivalStation] };
        const newInConnections = [...arrivalCopy.inConnections, connection];

        this.updateEarliestArrival(connection.arrivalStation, {
          timestamp: connection.arrivalTimestamp,
          inConnections: newInConnections,
        });
      }
    }
  }

  updateEarliestArrival(stationIndex: number, arrival: EarliestArrival) {
    this.earliestArrival[stationIndex] = {
      timestamp: arrival.timestamp,
      inConnections: arrival.inConnections,
    };
  }

  getFastestRoutes(
    departureStation: number,
    arrivalStation: number,
    departureTimestamp: number,
    numRoutes: number
  ): CSAConnection[][] | "no_solution" {
    const MAX_STATIONS = 100000;

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
