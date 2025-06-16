import express from "express";
import UserService from "../services/userService.js";
import { getUserSchema, createUserSchema, updateUserSchema, deleteUserSchema } from "../schemas/userSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";
export const userRouter = express.Router();
const service = new UserService();
// GET all users
userRouter.get("/get", async (req, res) => {
    try {
        const users = await service.getUsers();
        res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// GET one user by ID
userRouter.get("/get-one/:id", schemaValidator(getUserSchema, "params"), async (req, res) => {
    try {
        const { id } = req.params;
        const user = await service.getUserById(id);
        if (!user) {
            res.status(404).json({ message: `User ${id} not found` });
        }
        res.status(200).json({
            message: `User ${id}`,
            data: user,
        });
    }
    catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// CREATE one user
userRouter.post("/create-one", schemaValidator(createUserSchema, "body"), async (req, res) => {
    try {
        const newUserData = req.body;
        const createdUser = await service.createUser(newUserData);
        res.status(201).json({
            message: "User created successfully",
            data: createdUser,
        });
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// UPDATE one user
userRouter.patch("/update-one", schemaValidator(updateUserSchema, "params"), async (req, res) => {
    try {
        const updateUserData = req.body;
        const updatedUser = await service.updateUser(updateUserData);
        if (!updatedUser) {
            res.status(404).json({ message: `User ${req.body.id} coudl not be updated` });
        }
        res.status(200).json({
            message: `User ${updateUserData.id} updated successfully`,
            data: updatedUser,
        });
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
// DELETE one user
userRouter.delete("/delete-one/:id", schemaValidator(deleteUserSchema, "params"), async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await service.deleteUser(id);
        if (!deleted) {
            res.status(404).json({ message: `User ${id} not found` });
        }
        res.status(200).json({
            message: `User ${id} deleted successfully`,
        });
    }
    catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
