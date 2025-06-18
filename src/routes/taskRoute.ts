import express from "express";
import TasksService from "../services/taskService.js";
import {
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema,
  deleteTaskSchema
} from "../schemas/taskSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";

const taskRouter = express.Router();
const service = new TasksService();

// GET all tasks (optional)
taskRouter.get("/get", async (req, res) => {
  try {
    const tasks = await service.getTasks?.(); // if you implement getTasks()
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// GET one task by ID
taskRouter.get("/get-one/:id",
  schemaValidator(getTaskSchema, "params"),
  async (req, res) => {
  try {
    const { id } = req.params;
    const task = await service.getTaskById(id);
    if (!task) {
      res.status(404).json({ message: `Task ${id} not found` });
    }
    res.status(200).json({
      message: `Task ${id}`,
      data: task,
    });
  } catch (error) {
    console.error("Error fetching task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE one task
taskRouter.post("/create-one",
  schemaValidator(createTaskSchema, "body"),
  async (req, res) => {
  try {
    const newTaskData = req.body;
    const createdTask = await service.createTask(newTaskData);
    res.status(201).json({
      message: "Task created successfully",
      data: createdTask,
    });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE one task
taskRouter.patch("/update-one/",
  schemaValidator(updateTaskSchema, "body"),
  async (req, res) => {
  try {
    const newTaskData = req.body;
    const updatedTask = await service.updateTask(newTaskData);
    if (!updatedTask) {
      res.status(404).json({ message: `Task ${req.body.id} not found` });
    }
    res.status(200).json({
      message: `Task ${newTaskData.id} updated successfully`,
      data: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE one task
taskRouter.delete("/delete-one/:id",
  schemaValidator(deleteTaskSchema, "params"),
  async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteTask(id);
    if (!deleted) {
      res.status(404).json({ message: `Task ${id} not found` });
    }
    res.status(200).json({
      message: `Task ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default taskRouter
