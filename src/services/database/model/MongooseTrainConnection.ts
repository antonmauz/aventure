import { Document, model, Schema } from "mongoose";
import { DatabaseTrainStation } from "@services";

interface DatabaseTrainStop {
  stationId: DatabaseTrainStation["_id"];
  departureTime: number;
  arrivalTime: number;
  track: string;
}

const trainStopSchema = new Schema<DatabaseTrainStop>({
  stationId: { type: Schema.Types.ObjectId, ref: "trainStation", required: true },
  departureTime: { type: Number, required: true },
  arrivalTime: { type: Number, required: true },
  track: { type: String, required: true },
});

export interface DatabaseTrainConnection extends Document {
  trainType: string;
  trainId: string;
  trainStops: DatabaseTrainStop[];
}

const trainConnectionSchema = new Schema<DatabaseTrainConnection>(
  {
    trainType: { type: String, required: true },
    trainId: { type: String, required: true },
    trainStops: { type: [trainStopSchema], required: true },
  },
  { timestamps: true }
);

export const MongooseTrainConnection = model<DatabaseTrainConnection>(
  "trainConnection",
  trainConnectionSchema
);
