import { databaseService, DatabaseTrainStation } from "@services";
import { MongooseTrainConnection } from "../services/database/model/MongooseTrainConnection";
import { MongooseTrainStation } from "../services/database/model/MongooseTrainStation";

import timetable from "./timetable.json";

databaseService.connectDB();

const mapTrainConnections = async () => {
  // @ts-ignore
  const connections = await Promise.all(
    timetable.map(async ({ trainType, trainId, stops }) => {
      return {
        trainType,
        trainId,
        trainStops: await Promise.all(
          stops.map(async (stop: any) => {
            const station = (await MongooseTrainStation.findOne({
              name: stop.stationName,
            })) as DatabaseTrainStation;

            return {
              stationId: station._id,
              departureTime: stop.departureTime,
              arrivalTime: stop.arrivalTime,
              track: stop.track,
            };
          })
        ),
      };
    })
  );

  console.log(JSON.stringify(connections[0], null, 2));
  console.log(JSON.stringify(connections[1], null, 2));

  return connections;
};

const addTrainConnections = async () => {
  const connections = await mapTrainConnections();

  connections
    .filter((connection) => connection.trainStops.length > 1)
    .map(async (connection: any) => {
      await MongooseTrainConnection.create(connection);
      console.log(`Added ${connection.trainId} to db`);
    });
};

// mapTrainConnections(); // TODO

addTrainConnections();
