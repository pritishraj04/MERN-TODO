import asyncHandler from "express-async-handler";
import goalModel from "../models/goalModel.js";
import userModel from "../models/userModel.js";

// @desc Get Goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
  const goals = await goalModel.find({ user: req.user.id });

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
    user: req.user.id,
  });
  res.json(goal);
});

// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
export const updateGoals = asyncHandler(async (req, res) => {
  const goal = await goalModel.findById(req.params.id);

  //check for goal
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure goal belongs to current user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

  //check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure goal belongs to current user
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  goal.remove();

  res.json({ id: req.params.id });
});
