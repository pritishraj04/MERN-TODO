import express from "express";
import goalsRouter from "./routes/goalsRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import "dotenv/config";

const port = process.env.PORT || 5500;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRouter);

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Magic happening here: http://localhost:${port}`)
);
