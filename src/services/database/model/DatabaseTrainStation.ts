import { model, Schema, Document } from "mongoose";
import { addressSchema, IAddress } from "./DatabaseAddress";

export interface ITrainStation extends Document {
  name: string;
  dbStationId: string;
  dbEvaNumber: number;
  address: IAddress;
}

const trainStationSchema = new Schema<ITrainStation>(
  {
    name: { type: String, required: true },
    dbStationId: { type: String, required: true },
    dbEvaNumber: { type: Number, required: true },
    address: { type: addressSchema, required: true },
  },
  { timestamps: true }
);

export const DatabaseTrainStation = model<ITrainStation>("trainStation", trainStationSchema);
