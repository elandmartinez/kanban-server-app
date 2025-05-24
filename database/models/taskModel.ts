import { Model, DataTypes } from "sequelize"
import { TASK_STAGE_MODEL_NAME } from "./taskStageModel"

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
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: false,
    defaultValue: [],
  },
  stage: {
    type: DataTypes.STRING,
    allowNull: false,
    refences: {
      model: TASK_STAGE_MODEL_NAME,
      key: "id"
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE"
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: new Date("YY-MM-dd")
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: new Date("YY-MM-dd")
  },
}

export class TaskModel extends Model {
  static associate (models) {
    this.belongsTo(models.TaskStage, {
      as: "task"
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: TASKS_TABLE_NAME,
      modelName: TASK_MODEL_NAME,
      timeStamps: false
    }
  }
}