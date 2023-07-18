import { mappedStations } from "./mappedStations";
import { databaseService, MongooseTrainStation } from "@services";

databaseService.connectDB();

const addTrainStationsToDb = async () => {
  const dbStations = mappedStations.map(({ name, stationID, evaNumbers, address }, index) => ({
    name,
    dbStationId: stationID,
    dbEvaNumber: evaNumbers[0].number,
    csaIndex: index,
    address: {
      street: address.street,
      houseNumber: address.houseNumber ?? "N/A",
      zipCode: address.postalCode,
      city: address.city,
      country: address.country,
    },
  }));

  dbStations.map(async (station) => {
    console.log(`Adding ${station.name} to db`);
    await MongooseTrainStation.create(station);
    console.log(`Added ${station.name} to db`);
  });
};

addTrainStationsToDb();
