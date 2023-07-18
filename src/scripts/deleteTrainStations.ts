import { databaseService, MongooseTrainStation } from "@services";
import timetable from "./timetable.json";

databaseService.connectDB();

const deleteTrainStations = async () => {
  const neededTrainStations: string[] = timetable
    .map((journey) => journey.stops.map((stop) => stop.stationId.toString()))
    .flat(1);

  console.log("Deleting train stations...");

  const uniqueNeededTrainStations = [...new Set(neededTrainStations)];

  console.log(uniqueNeededTrainStations.length);

  const result = await MongooseTrainStation.deleteMany({
    dbStationId: {
      $nin: uniqueNeededTrainStations,
    },
  });

  console.log(`Deleted ${result} train stations`);
};

deleteTrainStations();
