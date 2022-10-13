import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import routes from "./routes";
import createError from "./utils/createError";

dotenv.config();
const app = express();

app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

app.use("/v1", routes);

app.get("*", (req: Request, res: Response, next: NextFunction) => {
  next(
    createError(res, 404, {
      code: "route_not_found",
      message: "Route not found",
      type: "routing_or_internals",
    })
  );
});

mongoose
  .connect(process.env.DB_ADDR, {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((err) => {
    console.log(err);
  });
