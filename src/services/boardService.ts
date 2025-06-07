import sequelize from '../libs/sequelize.js';
import { BoardModel, BoardAttributes, BoardCreationAttributes } from '../database/models/boardModel.js';

// Get the strongly typed model from Sequelize's registry
const boardModel = sequelize.models.Board as typeof BoardModel;

// Create Input Types
interface CreateBoardInput extends BoardCreationAttributes {}

interface UpdateBoardInput {
  id: string;
  name?: string;
}

class BoardService {
  async createBoard(data: CreateBoardInput): Promise<BoardModel> {
    try {
      const newBoard = await boardModel.create(data);
      return newBoard;
    } catch (error) {
      console.error('Error creating board:', error);
      throw new Error('Failed to create board');
    }
  }

  async getBoards (): Promise<BoardModel[] | null> {
    try {
      const boards = await boardModel.findAll()

      return boards
    } catch (error) {
      console.error("Error fetching all the boards", error)
      throw new Error("Failed to fetch all boards")
    }
  }
  async getBoardById(id: string): Promise<BoardModel | null> {
    try {
      const board = await boardModel.findByPk(id);
      return board;
    } catch (error) {
      console.error(`Error fetching board with id ${id}:`, error);
      throw new Error('Failed to fetch board');
    }
  }

  async updateBoard(data: UpdateBoardInput): Promise<BoardModel | null> {
    try {
      const board = await boardModel.findByPk(data.id);
      if (!board) return null;

      await board.update({ name: data.name });
      return board;
    } catch (error) {
      console.error(`Error updating board with id ${data.id}:`, error);
      throw new Error('Failed to update board');
    }
  }

  async deleteBoard(id: string): Promise<boolean> {
    try {
      const board = await boardModel.findByPk(id);
      if (!board) return false;

      await board.destroy();
      return true;
    } catch (error) {
      console.error(`Error deleting board with id ${id}:`, error);
      throw new Error('Failed to delete board');
    }
  }
}

export default BoardService;
