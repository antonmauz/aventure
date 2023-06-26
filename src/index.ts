import express from "express";
import dotenv from "dotenv";
import { userRouter } from "@controllers/user";
import { blogPostRouter } from "@controllers/blog";
import { authenticationRouter } from "@controllers/authentication";
import { restaurantRouter } from "@controllers/restaurant";
import { authJwt } from "@middlewares";
import cors from "cors";
import { databaseService } from "@services";
import helmet from "helmet";

const DATA_LIMIT = "1mb";

dotenv.config();

databaseService.connectDB();

const app = express();

app.use(helmet());

app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: DATA_LIMIT }));
app.use(cors());

app.use("/v1/user", authJwt.verifyToken, userRouter);
app.use("/v1/blog", blogPostRouter);
app.use("/v1/auth", authenticationRouter);
app.use("/v1/restaurant", restaurantRouter);

// TODO handle errors app.use(handleErrors);

app.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running on port ${Number(process.env.PORT)}`);
});
