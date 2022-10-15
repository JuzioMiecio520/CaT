import { PrismaClient } from "@prisma/client";
import cors from "cors";
import * as dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import createError from "./utils/createError";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(morgan("short"));
app.use(cors());
app.use(express.json());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use((req: Request, res: Response, next: NextFunction) => {
  req.prisma = prisma;
  next();
});

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

prisma
  .$connect()
  .then(() => {
    app.listen(7000, () => {
      console.log("Server is running on port 7000");
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
