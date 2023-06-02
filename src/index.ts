import express from "express";
import dotenv from "dotenv";
import { userRouter } from "@modules/user";
import cors from "cors";
import { databaseService } from "@services/database";

dotenv.config();

databaseService.connectDB();

const app = express();

const DATA_LIMIT = "1mb";

app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: DATA_LIMIT }));
app.use(cors());

app.use("/v1/user", userRouter);

// TODO handle errors app.use(handleErrors);

app.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running on port ${Number(process.env.PORT)}`);
});
