import express from "express";
import BoardService from "../services/boardService";
export const boardRouter = express.Router();
const service = new BoardService();
boardRouter.post("/board", async (req, res) => {
    const boardData = req.body;
    const response = await service.createBoard(boardData);
    return res.status(200).json({
        message: "Board created",
        data: response
    });
});
boardRouter.get("/board/:id", async (req, res) => {
    const { id: boardId } = req.params;
    const response = await service.getBoardById(boardId);
    return res.status(200).json({
        message: `Board ${boardId}`,
        data: response
    });
});
