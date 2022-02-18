import express from "express";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalController.js";

const goalsRouter = express.Router();

goalsRouter.route("/").get(getGoals).post(setGoals);
goalsRouter.route("/:id").put(updateGoals).delete(deleteGoals);

export default goalsRouter;
