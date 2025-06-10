import { Model, DataTypes, Sequelize, Optional } from "sequelize"
import { TASK_STAGE_TABLE_NAME } from "./taskStageModel.js"

export const TASKS_TABLE_NAME = "tasks"
const TASK_MODEL_NAME = "Task"

export const taskSchema = {
  id: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  description: {
    type: new DataTypes.STRING(512),
    allowNull: false,
  },
  subtasks: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: [],
  },
  taskStageId: {
    type: DataTypes.STRING(128),
    allowNull: false,
    references: {
      model: TASK_STAGE_TABLE_NAME,
      key: "id"
    },
    field: "task_stage_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW
  },
}

export interface TaskAttributes {
  id: string;
  title: string;
  description: string;
  subtasks: string[];
  taskStageId: string;
}

export interface TaskCreationAttributes extends Optional<TaskAttributes, 'id'> {}

export class TaskModel extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public id!: string;
  public title!: string;
  public description!: string;
  public subtasks!: string[];
  public taskStageId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;


  static associate (sequelize: Sequelize) {
    this.belongsTo(sequelize.models.TaskStage, {
      as: TASK_STAGE_TABLE_NAME
    })
  }

  static config (sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TASKS_TABLE_NAME,
      modelName: TASK_MODEL_NAME,
      timeStamps: false
    }
  }
}