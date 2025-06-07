import sequelize from '../libs/sequelize';
import { TaskModel, TaskCreationAttributes, TaskAttributes } from '../database/models/taskModel';

const taskModel = sequelize.models.Task as typeof TaskModel

// Define input type for creating a new task
interface CreateTaskInput {
  title: string;
  description: string;
  subtasks: string[];
  stage: string;
}

// Define input type for updating a task (partial, but `id` required)
interface UpdateTaskInput {
  id: string;
  title?: string;
  description?: string;
  subtasks?: string[];
  stage?: string;
}

class TasksService {
  async createTask(data: CreateTaskInput): Promise<TaskModel> {
    try {
      const newTask = await taskModel.create(data);
      return newTask;
    } catch (error) {
      console.error('Error creating task:', error);
      throw new Error('Failed to create task');
    }
  }

  async getTaskById(id: string): Promise<TaskModel | null> {
    try {
      const task = await taskModel.findByPk(id);
      return task;
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
      throw new Error('Failed to fetch task');
    }
  }

  async updateTask(data: UpdateTaskInput): Promise<TaskModel | null> {
    try {
      const task = await taskModel.findByPk(data.id);
      if (!task) return null;

      await task.update({
        title: data.title,
        description: data.description,
        subtasks: data.subtasks,
        stage: data.stage,
      });

      return task;
    } catch (error) {
      console.error(`Error updating task with id ${data.id}:`, error);
      throw new Error('Failed to update task');
    }
  }

  async deleteTask(id: string): Promise<boolean> {
    try {
      const task = await taskModel.findByPk(id);
      if (!task) return false;

      await task.destroy();
      return true;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw new Error('Failed to delete task');
    }
  }
}


export default TasksService;
