import { Document, model, Schema } from "mongoose";
import { addressSchema, DatabaseAddress } from "./DatabaseAddress";

export interface DatabaseTrainStation extends Document {
  name: string;
  dbStationId: string;
  dbEvaNumber: number;
  address: DatabaseAddress;
}

const trainStationSchema = new Schema<DatabaseTrainStation>(
  {
    name: { type: String, required: true },
    dbStationId: { type: String, required: true },
    dbEvaNumber: { type: Number, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true }
);

export const MongooseTrainStation = model<DatabaseTrainStation>("trainStation", trainStationSchema);
