import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import "dotenv/config";
import goalsRouter from "./routes/goalsRoutes.js";
import usersRouter from "./routes/userRoutes.js";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

const port = process.env.PORT || 5500;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalsRouter);
app.use("/api/users", usersRouter);

//serve frontend
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "frontend", "build", "index.html")
    )
  );
} else {
  app.get("*", (req, res) => res.send("Please set to Production"));
}

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Magic happening here: http://localhost:${port}`)
);
