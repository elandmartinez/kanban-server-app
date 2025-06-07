import sequelize from '../libs/sequelize';
// Get the strongly typed model from Sequelize's registry
const boardModel = sequelize.models.Board;
class BoardService {
    async createBoard(data) {
        try {
            const newBoard = await boardModel.create(data);
            return newBoard;
        }
        catch (error) {
            console.error('Error creating board:', error);
            throw new Error('Failed to create board');
        }
    }
    async getBoardById(id) {
        try {
            const board = await boardModel.findByPk(id);
            return board;
        }
        catch (error) {
            console.error(`Error fetching board with id ${id}:`, error);
            throw new Error('Failed to fetch board');
        }
    }
    async updateBoard(data) {
        try {
            const board = await boardModel.findByPk(data.id);
            if (!board)
                return null;
            await board.update({ name: data.name });
            return board;
        }
        catch (error) {
            console.error(`Error updating board with id ${data.id}:`, error);
            throw new Error('Failed to update board');
        }
    }
    async deleteBoard(id) {
        try {
            const board = await boardModel.findByPk(id);
            if (!board)
                return false;
            await board.destroy();
            return true;
        }
        catch (error) {
            console.error(`Error deleting board with id ${id}:`, error);
            throw new Error('Failed to delete board');
        }
    }
}
export default BoardService;
