import express from "express";
import UserService from "../services/userService.js";

export const userRouter = express.Router();
const service = new UserService();

// GET all users
userRouter.get("/get", async (req, res) => {
  try {
    const users = await service.getUsers();
    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET one user by ID
userRouter.get("/get-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await service.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    return res.status(200).json({
      message: `User ${id}`,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// CREATE one user
userRouter.post("/create-one", async (req, res) => {
  try {
    const newUserData = req.body;
    const createdUser = await service.createUser(newUserData);
    return res.status(201).json({
      message: "User created successfully",
      data: createdUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// UPDATE one user
userRouter.patch("/update-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateUserData = { ...req.body, id };
    const updatedUser = await service.updateUser(updateUserData);
    if (!updatedUser) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    return res.status(200).json({
      message: `User ${id} updated successfully`,
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE one user
userRouter.delete("/delete-one/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await service.deleteUser(id);
    if (!deleted) {
      return res.status(404).json({ message: `User ${id} not found` });
    }
    return res.status(200).json({
      message: `User ${id} deleted successfully`,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});
