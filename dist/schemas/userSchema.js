// src/schemas/userSchemas.ts
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
const emailSchema = Joi.string().email().messages({
    "string.email": "Email must be a valid email address",
    "string.base": "Email must be a string",
    "any.required": "Email is required",
});
const passwordSchema = Joi.string().min(6).max(128).messages({
    "string.base": "Password must be a string",
    "string.min": "Password must be at least 6 characters",
    "string.max": "Password must not exceed 128 characters",
    "any.required": "Password is required",
});
// --- CRUD Schemas ---
// Create
export const createUserSchema = Joi.object({
    id: idSchema,
    name: nameSchema.required(),
    email: emailSchema.required(),
    password: passwordSchema.required(),
});
// Read (e.g., get by ID)
export const getUserSchema = Joi.object({
    id: idSchema,
});
// Update (only name, email, or password can be updated; id is required)
export const updateUserSchema = Joi.object({
    id: idSchema,
    name: nameSchema.optional(),
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
});
// Delete
export const deleteUserSchema = Joi.object({
    id: idSchema,
});
