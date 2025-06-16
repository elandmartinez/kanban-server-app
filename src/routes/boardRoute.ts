import express from "express";
import BoardService from "../services/boardService.js";
import { getBoardSchema, createBoardSchema, updateBoardSchema, deleteBoardSchema, } from "../schemas/boardSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";

export const boardRouter = express.Router();
const service = new BoardService();

boardRouter.get("/get",
  async (req, res) => {
  try {
    const response = await service.getBoards();
    res.status(200).json({
      message: "Boards fetched successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching boards:", error);
    res.status(500).json({ message: "Failed to fetch boards" });
  }
});

boardRouter.get("/get-one/:id",
  schemaValidator(getBoardSchema, "params"),
  async (req, res) => {
  const { id: boardId } = req.params;
  try {
    const response = await service.getBoardById(boardId);
    if (!response) {
      res.status(404).json({ message: `Board ${boardId} not found` });
    }
    res.status(200).json({
      message: `Board ${boardId}`,
      data: response,
    });
  } catch (error) {
    console.error(`Error fetching board ${boardId}:`, error);
    res.status(500).json({ message: "Failed to fetch board" });
  }
});

boardRouter.post("/create-one/",
  schemaValidator(createBoardSchema, "body"),
  async (req, res) => {
  const newBoardData = req.body;
  try {
    const response = await service.createBoard(newBoardData);
    res.status(201).json({
      message: "Board created successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error creating board:", error);
    res.status(500).json({ message: "Failed to create board" });
  }
});

boardRouter.patch("/update-one",
  schemaValidator(updateBoardSchema, "body"),
  async (req, res) => {
  const newBoardData = req.body;
  try {
    const response = await service.updateBoard(newBoardData);
    console.log({response})

    if (!response) {
      console.log("board was not found")
      res.status(404).json({ message: "Board not found for update" });
    }
    console.log("Board was found")
    res.status(200).json({
      message: "Board updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error updating board:", error);
    res.status(500).json({ message: "Failed to update board" });
  }
});

boardRouter.delete("/delete-one/:id",
  schemaValidator(deleteBoardSchema, "params"),
  async (req, res) => {
  const { id: boardId } = req.params;
  try {
    const response = await service.deleteBoard(boardId);
    if (!response) {
      res.status(404).json({ message: `Board ${boardId} not found` });
    }
    res.status(200).json({
      message: `Board ${boardId} deleted successfully`,
    });
  } catch (error) {
    console.error(`Error deleting board ${boardId}:`, error);
    res.status(500).json({ message: "Failed to delete board" });
  }
});
