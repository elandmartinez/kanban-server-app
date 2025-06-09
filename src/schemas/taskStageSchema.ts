// src/schemas/taskStageSchemas.ts

import Joi from "joi";

// --- Property Schemas ---
const idSchema = Joi.string().max(128).required().messages({
  "string.base": "ID must be a string",
  "string.max": "ID must not exceed 128 characters",
  "any.required": "ID is required",
});

const nameSchema = Joi.string().max(128).messages({
  "string.base": "Name must be a string",
  "string.max": "Name must not exceed 128 characters",
  "any.required": "Name is required",
});

const boardSchema = Joi.string().max(128).messages({
  "string.base": "Board ID must be a string",
  "string.max": "Board ID must not exceed 128 characters",
  "any.required": "Board ID is required",
});

// --- CRUD Schemas ---

// Create
export const createTaskStageSchema = Joi.object({
  id: idSchema,
  name: nameSchema.required(),
  board: boardSchema.required(),
});

// Read (e.g., get by ID)
export const getTaskStageSchema = Joi.object({
  id: idSchema,
});

// Update
export const updateTaskStageSchema = Joi.object({
  id: idSchema,
  name: nameSchema,
  board: boardSchema,
});

// Delete
export const deleteTaskStageSchema = Joi.object({
  id: idSchema,
});

// --- TypeScript Interface (optional for manual type usage) ---
export interface TaskStage {
  id: string;
  name: string;
  board: string;
}
