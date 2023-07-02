import { TRAIN_JOURNEYS_MOCK } from "../../services/deutscheBahn/TRAIN_JOURNEYS_MOCK";

class Connection {
  departureStation: number;
  arrivalStation: number;
  departureTimestamp: number;
  arrivalTimestamp: number;

  constructor(line: string) {
    const tokens = line.trim().split(" ");

    this.departureStation = parseInt(tokens[0]);
    this.arrivalStation = parseInt(tokens[1]);
    this.departureTimestamp = parseInt(tokens[2]);
    this.arrivalTimestamp = parseInt(tokens[3]);
  }
}

class Timetable {
  connections: Connection[];

  constructor(lines: string[]) {
    this.connections = [];

    for (let line of lines) {
      this.connections.push(new Connection(line));
    }
  }
}

class CSA {
  private timetable: Timetable;
  private earliestArrival: any[];
  private inConnection: any[];

  constructor(lines: string[]) {
    this.timetable = new Timetable(lines);
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
      } else if (connection.arrivalTimestamp > earliest) {
        return;
      }
    }
  }

  printResult(arrivalStation: number) {
    if (this.inConnection[arrivalStation] === null) {
      console.log("NO_SOLUTION");

      return;
    }

    const route = [];

    let lastConnection = this.inConnection[arrivalStation];

    while (lastConnection !== null) {
      route.push(lastConnection);
      lastConnection = this.inConnection[lastConnection.departureStation];
    }

    route.reverse();

    for (let connection of route) {
      console.log(
        connection.departureStation +
          " " +
          connection.arrivalStation +
          " " +
          connection.departureTimestamp +
          " " +
          connection.arrivalTimestamp
      );
    }
  }

  compute(departureStation: number, arrivalStation: number, departureTimestamp: number) {
    const MAX_STATIONS = 100000;

    this.inConnection = new Array(MAX_STATIONS);
    this.earliestArrival = new Array(MAX_STATIONS);

    for (let i = 0; i < MAX_STATIONS; ++i) {
      this.inConnection[i] = null;
      this.earliestArrival[i] = Number.MAX_VALUE;
    }

    this.earliestArrival[departureStation] = departureTimestamp;

    if (departureStation <= MAX_STATIONS && arrivalStation <= MAX_STATIONS) {
      this.mainLoop(arrivalStation);
    }

    this.printResult(arrivalStation);
  }

  static main() {
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.on("line", (line: string) => {
      const tokens = line.trim().split(" ");

      if (tokens.length === 3) {
        const csa = new CSA(transformTrainJourneys());

        csa.compute(parseInt(tokens[0]), parseInt(tokens[1]), parseInt(tokens[2]));
      }
    });

    rl.on("close", () => {
      process.exit(0);
    });
  }
}

const transformTrainJourneys = () => {
  const journeys = TRAIN_JOURNEYS_MOCK.map((trainJourney) => {
    const { route } = trainJourney;

    return route
      .map((currentStop, index) => {
        if (index === route.length - 1) {
          return null;
        }

        const nextStop = route[index + 1];

        return `${currentStop.stationId} ${nextStop.stationId} ${hmsToSecondsOnly(
          currentStop.departureTime
        )} ${hmsToSecondsOnly(nextStop.arrivalTime)}`;
      })
      .filter((line) => line !== null) as string[];
  });

  return journeys.reduce((acc, line) => [...acc, ...line], []);
};

const hmsToSecondsOnly = (hm: string) => {
  const a = hm.split(":");

  return +a[0] * 60 * 60 + +a[1] * 60;
};

CSA.main();
