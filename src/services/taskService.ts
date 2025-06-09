import sequelize from '../libs/sequelize.js';
import {
  TaskModel,
  TaskAttributes,
  TaskCreationAttributes,
} from '../database/models/taskModel.js';

// Get the strongly typed model from Sequelize's registry
const taskModel = sequelize.models.Task as typeof TaskModel;

// Input types
interface CreateTaskInput extends TaskCreationAttributes {}

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

  async getTasks(): Promise<TaskModel[]> {
    try {
      const tasks = await taskModel.findAll();
      return tasks;
    } catch (error) {
      console.error('Error fetching all tasks:', error);
      throw new Error('Failed to fetch all tasks');
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
        title: data.title || task.title,
        description: data.description || task.description,
        subtasks: data.subtasks || task.subtasks,
        stage: data.stage || task.stage,
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
