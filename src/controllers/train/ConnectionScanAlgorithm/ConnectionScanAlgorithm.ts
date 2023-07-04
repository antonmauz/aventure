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
    this.arrivalStation = arrivalStation;
    this.arrivalTrackId = arrivalTrackId;
    this.departureStation = departureStation;
    this.departureTimestamp = departureTimestamp;
    this.arrivalTimestamp = arrivalTimestamp;
  }
}

class Timetable {
  connections: CSAConnection[];

  constructor(connections: CSAConnection[]) {
    this.connections = [];

    for (let connection of connections) {
      this.connections.push(new CSAConnection(connection));
    }
  }
}

// TODO make singleton
export class CSA {
  private timetable: Timetable;
  private earliestArrival: number[];
  private inConnection: (CSAConnection | null)[];

  constructor(connections: CSAConnection[]) {
    this.timetable = new Timetable(connections);
    this.earliestArrival = [];
    this.inConnection = [];
  }

  mainLoop(arrivalStation: number) {
    let earliest = Number.MAX_VALUE;

    for (let connection of this.timetable.connections) {
      if (
        connection.departureTimestamp >= this.earliestArrival[connection.departureStation] &&
        connection.arrivalTimestamp < this.earliestArrival[connection.arrivalStation]
      ) {
        this.earliestArrival[connection.arrivalStation] = connection.arrivalTimestamp;
        this.inConnection[connection.arrivalStation] = connection;

        if (connection.arrivalStation === arrivalStation) {
          earliest = Math.min(earliest, connection.arrivalTimestamp);
        }
      }
    }
  }

  getResult(arrivalStation: number) {
    if (this.inConnection[arrivalStation] === null) {
      return "no_solution";
    }

    const route = [];

    let lastConnection = this.inConnection[arrivalStation];

    while (lastConnection !== null) {
      route.push(lastConnection);
      lastConnection = this.inConnection[lastConnection.departureStation];
    }

    route.reverse();

    return route;
  }

  compute(departureStation: number, arrivalStation: number, departureTimestamp: number) {
    const MAX_STATIONS = 100000;

    this.inConnection = new Array(MAX_STATIONS).fill(null);
    this.earliestArrival = new Array(MAX_STATIONS).fill(Number.MAX_VALUE);

    this.earliestArrival[departureStation] = departureTimestamp;

    if (departureStation <= MAX_STATIONS && arrivalStation <= MAX_STATIONS) {
      this.mainLoop(arrivalStation);
    }

    return this.getResult(arrivalStation);
  }
}
