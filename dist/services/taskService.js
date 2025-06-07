import sequelize from '../libs/sequelize';
const taskModel = sequelize.models.Task;
class TasksService {
    async createTask(data) {
        try {
            const newTask = await taskModel.create(data);
            return newTask;
        }
        catch (error) {
            console.error('Error creating task:', error);
            throw new Error('Failed to create task');
        }
    }
    async getTaskById(id) {
        try {
            const task = await taskModel.findByPk(id);
            return task;
        }
        catch (error) {
            console.error(`Error fetching task with id ${id}:`, error);
            throw new Error('Failed to fetch task');
        }
    }
    async updateTask(data) {
        try {
            const task = await taskModel.findByPk(data.id);
            if (!task)
                return null;
            await task.update({
                title: data.title,
                description: data.description,
                subtasks: data.subtasks,
                stage: data.stage,
            });
            return task;
        }
        catch (error) {
            console.error(`Error updating task with id ${data.id}:`, error);
            throw new Error('Failed to update task');
        }
    }
    async deleteTask(id) {
        try {
            const task = await taskModel.findByPk(id);
            if (!task)
                return false;
            await task.destroy();
            return true;
        }
        catch (error) {
            console.error(`Error deleting task with id ${id}:`, error);
            throw new Error('Failed to delete task');
        }
    }
}
export default TasksService;
