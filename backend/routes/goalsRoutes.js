import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  getGoals,
  setGoals,
  updateGoals,
  deleteGoals,
} from "../controllers/goalController.js";

const goalsRouter = express.Router();

goalsRouter.route("/").get(protect, getGoals).post(protect, setGoals);
goalsRouter
  .route("/:id")
  .put(protect, updateGoals)
  .delete(protect, deleteGoals);

export default goalsRouter;
