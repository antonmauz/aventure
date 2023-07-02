import { DatabaseTrainStation } from "../services/database/model/DatabaseTrainStation";
import { mappedStations } from "./mappedStations";
import { databaseService } from "@services";

databaseService.connectDB();

const addTrainStationsToDb = async () => {
  const dbStations = mappedStations.map(({ name, stationID, evaNumbers, address }) => ({
    name,
    dbStationId: stationID,
    dbEvaNumber: evaNumbers[0].number,
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
    await DatabaseTrainStation.create(station);
    console.log(`Added ${station.name} to db`);
  });
};

addTrainStationsToDb();
