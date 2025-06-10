import sequelize from '../libs/sequelize.js';
// Get the strongly typed model from Sequelize's registry
const taskStageModel = sequelize.models.TaskStage;
class TaskStageService {
    async createTaskStage(data) {
        try {
            const newStage = await taskStageModel.create(data);
            return newStage;
        }
        catch (error) {
            console.error('Error creating task stage:', error);
            throw new Error('Failed to create task stage');
        }
    }
    async getTaskStages() {
        try {
            const stages = await taskStageModel.findAll({ include: sequelize.models.Board });
            return stages;
        }
        catch (error) {
            console.error('Error fetching task stages:', error);
            throw new Error('Failed to fetch task stages');
        }
    }
    async getTaskStageById(id) {
        try {
            const stage = await taskStageModel.findByPk(id);
            return stage;
        }
        catch (error) {
            console.error(`Error fetching task stage with id ${id}:`, error);
            throw new Error('Failed to fetch task stage');
        }
    }
    async updateTaskStage(data) {
        try {
            const stage = await taskStageModel.findByPk(data.id);
            if (!stage)
                return null;
            await stage.update({
                name: data.name,
                board: data.board
            });
            return stage;
        }
        catch (error) {
            console.error(`Error updating task stage with id ${data.id}:`, error);
            throw new Error('Failed to update task stage');
        }
    }
    async deleteTaskStage(id) {
        try {
            const stage = await taskStageModel.findByPk(id);
            if (!stage)
                return false;
            await stage.destroy();
            return true;
        }
        catch (error) {
            console.error(`Error deleting task stage with id ${id}:`, error);
            throw new Error('Failed to delete task stage');
        }
    }
}
export default TaskStageService;
