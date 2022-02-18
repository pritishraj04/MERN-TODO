import asyncHandler from "express-async-handler";
import goalModel from "../models/goalModel.js";

// @desc Get Goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find();

  res.json(goals);
});

// @desc Set Goals
// @route POST /api/goals
// @access Private
export const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await goalModel.create({
    text: req.body.text,
  });
  res.json(goal);
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
export const updateGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await goalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updatedGoal);
});

// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
export const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  goal.remove();

  res.json({ id: req.params.id });
});
