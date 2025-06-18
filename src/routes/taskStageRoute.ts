import express from "express";
import TaskStageService from "../services/taskStageService.js";
import {
  getTaskStageSchema,
  createTaskStageSchema,
  updateTaskStageSchema,
  deleteTaskStageSchema
} from "../schemas/taskStageSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";

const taskStageRouter = express.Router();
const service = new TaskStageService();

// GET all task stages
taskStageRouter.get("/get", async (req, res) => {
  try {
    const stages = await service.getTaskStages();
    res.status(200).json({
      message: "Task stages fetched successfully",
      data: stages,
    });
  } catch (error) {
    console.error("Error fetching task stages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET one task stage by ID
taskStageRouter.get("/get-one/:id",
  schemaValidator(getTaskStageSchema, "params"),
  async (req, res) => {
  try {
    const { id } = req.params;
    const stage = await service.getTaskStageById(id);
    if (!stage) {
      res.status(404).json({ message: `Task stage ${id} not found` });
    }
    res.status(200).json({
      message: `Task stage ${id}`,
      data: stage,
    });
  } catch (error) {
    console.error("Error fetching task stage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE one task stage
taskStageRouter.post("/create-one",
  schemaValidator(createTaskStageSchema, "body"),
  async (req, res) => {
  try {
    const newStageData = req.body;
    const createdStage = await service.createTaskStage(newStageData);
    res.status(201).json({
      message: "Task stage created successfully",
      data: createdStage,
    });
  } catch (error) {
    console.error("Error creating task stage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE one task stage
taskStageRouter.patch("/update-one",
  schemaValidator(updateTaskStageSchema, "body"),
  async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedStage = await service.updateTaskStage(updatedData);
    if (!updatedStage) {
      res.status(404).json({ message: `Task stage ${id} not found` });
    }
    res.status(200).json({
      message: `Task stage ${id} updated successfully`,
      data: updatedStage,
    });
  } catch (error) {
    console.error("Error updating task stage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE one task stage
taskStageRouter.delete("/delete-one/:id",
  schemaValidator(deleteTaskStageSchema, "params"),
  async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteTaskStage(id);
    if (!deleted) {
      res.status(404).json({ message: `Task stage ${id} not found` });
    }
    res.status(200).json({
      message: `Task stage ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting task stage:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default taskStageRouter