import express from "express";
import dotenv from "dotenv";
import { userRouter } from "@controllers/user";
import { blogPostRouter } from "@controllers/blog";
import { authenticationRouter } from "@controllers/authentication";
import { restaurantRouter } from "@controllers/restaurant";
import { hotelRouter } from "@controllers/hotel";
import cors from "cors";
import { databaseService } from "@services";
import helmet from "helmet";
import session from "express-session";
import { trainRouter } from "@controllers/train";

const DATA_LIMIT = "1mb";

dotenv.config();

databaseService.connectDB();

const app = express();

app.use(helmet());

const generateRandom = (): string => (Math.random() + 1).toString(16).substring(4);

const generateSecret = (): string => `${generateRandom()}-${generateRandom()}-${generateRandom()}`;

export const handleSession = session({
  secret: generateSecret(),
  name: "session",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true },
});

app.use(handleSession);

app.use(express.json({ limit: DATA_LIMIT }));
app.use(express.urlencoded({ extended: false, limit: DATA_LIMIT }));
app.use(cors());

app.use("/v1/user", userRouter);
app.use("/v1/blog", blogPostRouter);
app.use("/v1/hotel", hotelRouter);
app.use("/v1/auth", authenticationRouter);
app.use("/v1/restaurant", restaurantRouter);
app.use("/v1/train", trainRouter);

// TODO handle errors app.use(handleErrors);

app.listen(Number(process.env.PORT), "0.0.0.0", () => {
  console.log(`⚡️[server]: Server is running on port ${Number(process.env.PORT)}`);
});
