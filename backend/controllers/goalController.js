import asyncHandler from "express-async-handler";

// @desc Get Goals
// @route GET /api/goals
// @access Private
export const getGoals = asyncHandler(async (req, res) => {
  res.json({ message: "Get Goals" });
});
// @desc Set Goals
// @route POST /api/goals
// @access Private
export const setGoals = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }
  console.log(req.body);
  res.json({ message: "Set Goals" });
});
// @desc Update Goals
// @route PUT /api/goals/:id
// @access Private
export const updateGoals = asyncHandler(async (req, res) => {
  res.json({ message: `Update goal ${req.params.id}` });
});
// @desc Delete Goals
// @route DELETE /api/goals/:id
// @access Private
export const deleteGoals = asyncHandler(async (req, res) => {
  res.json({ message: `Delete goal ${req.params.id}` });
});
