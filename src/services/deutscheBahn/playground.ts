import fs from "fs";
// @ts-ignore
import filteredData from "./filteredData.json";
// @ts-ignore
import mappedStations from "./mappedStations.json";
import axios from "axios";
import { TRAIN_JOURNEYS_MOCK } from "./TRAIN_JOURNEYS_MOCK";

const filter = () => {
  const newData = filteredData.filter(
    (station: any) => station.hasMobilityService !== "no" && station.hasSteplessAccess === "yes"
  );

  console.log(newData.length);

  fs.writeFile(
    "/Users/cdansard/university/seba-project/backend/src/services/deutscheBahn/filteredData.json",
    JSON.stringify(newData),
    () => {}
  );
};

function countUnique(iterable: string[]) {
  return new Set(iterable).size;
}

const check = () => {
  const names = filteredData.map((station: any) => station.name);

  console.log(countUnique(names));
};

const mapStations = () => {
  const mappedStations = filteredData.map((station: any) => {
    const risStation = {};

    return {
      ...station,
      ...risStation,
    };
  });

  fs.writeFile(
    "/Users/cdansard/university/seba-project/backend/src/services/deutscheBahn/mappedStations.ts",
    JSON.stringify(mappedStations),
    () => {}
  );
};

const getStationBoard = async () => {
  const url = `https://apis.deutschebahn.com/db-api-marketplace/apis/timetables/v1/fchg/8002549`;

  const { data } = await axios.get(url, {
    headers: {
      accept: "application/xml",
      "DB-Client-Id": "9844e37c7f7a85c668183d47acba386e",
      "DB-Api-Key": "f75a00440e0bf231e8d5345376f422be",
    },
  });

  console.log(data);
};

const getstationsNames = () => {
  const result = mappedStations.map((station: any) => station.name);

  fs.writeFile(
    "/Users/cdansard/university/seba-project/backend/src/services/deutscheBahn/stationsNames.json",
    JSON.stringify(result),
    () => {}
  );
};

const mapStaionId = (name: string) => {
  const station = mappedStations.find((station: any) => station.name === name);

  return {
    stationId: station.stationID,
    evaNumber: station.evaNumbers[0].number,
  };
};

const mapTrainJourney = () => {
  const result = TRAIN_JOURNEYS_MOCK.map(({ departure, destination, route, ...trainJourney }) => {
    return {
      ...trainJourney,
      destination: {
        ...destination,
        ...mapStaionId(destination.station),
      },
      departure: {
        ...departure,
        ...mapStaionId(departure.station),
      },
      route: route.map((stop) => ({
        ...stop,
        ...mapStaionId(stop.station),
      })),
    };
  });

  fs.writeFile(
    "/Users/cdansard/university/seba-project/backend/src/services/deutscheBahn/trainJourneys.json",
    JSON.stringify(result),
    () => {}
  );
};

mapTrainJourney();
