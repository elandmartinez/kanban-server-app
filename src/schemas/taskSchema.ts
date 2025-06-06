// src/schemas/taskSchemas.ts

import Joi from "joi"

// Individual property schemas
const idSchema = Joi.string().max(128).required().messages({
  "string.max": "The task ID exceeds the limit",
  "string.base": "Task ID must be a string",
  "any.required": "Task ID is required",
});

const titleSchema = Joi.string().max(128).messages({
  "string.max": "The task title exceeds 128 characters",
  "string.base": "Task title must be a string",
  "any.required": "Task title is required",
});

const descriptionSchema = Joi.string().max(512).messages({
  "string.max": "Task description must not exceed 512 characters",
  "string.base": "Task description must be a string",
  "any.required": "Task description is required",
});

const stageSchema = Joi.string().messages({
  "string.base": "Stage must be a string",
  "any.required": "Stage is required",
});

const subtasksSchema = Joi.array()
  .items(Joi.string().max(128))
  .required()
  .messages({
    "array.base": "Subtasks must be an array of strings",
    "any.required": "Subtasks are required",
  });

// Task Create Schema
export const createTaskSchema = Joi.object({
  title: titleSchema,
  description: descriptionSchema,
  subtasks: subtasksSchema,
  stage: stageSchema,
});

// Task Get Schema (e.g., to get a task by ID)
export const getTaskSchema = Joi.object({
  id: idSchema,
});

// Task Update Schema
export const updateTaskSchema = Joi.object({
  id: idSchema,
  title: titleSchema.optional(),
  description: descriptionSchema.optional(),
  subtasks: subtasksSchema.optional(),
  stage: stageSchema.optional(),
});

// Task Delete Schema
export const deleteTaskSchema = Joi.object({
  id: idSchema,
});

// Optional: TypeScript interface for type safety (manual)
export interface Task {
  id: string;
  title: string;
  description: string;
  subtasks: string[];
  stage: string;
}
