import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { BOARD_MODEL_NAME, BOARD_TABLE_NAME } from "./boardModel.js";
import { TASKS_TABLE_NAME } from "./taskModel.js";

export const TASK_STAGE_TABLE_NAME = "task_stages";
const TASK_STAGE_MODEL_NAME = "TaskStage";

export const taskStageSchema = {
  id: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    unique: true
  },
  boardId: {
    type: DataTypes.STRING(128),
    allowNull: false,
    references: {
      model: BOARD_TABLE_NAME,
      key: "id"
    },
    field: "board_id",
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
};

export interface TaskStageAttributes {
  id: string;
  name: string;
  boardId: string;
}

export interface TaskStageCreationAttributes extends Optional<TaskStageAttributes, 'id'> {}

export class TaskStageModel
  extends Model<TaskStageAttributes, TaskStageCreationAttributes>
  implements TaskStageAttributes {
  public id!: string;
  public name!: string;
  public boardId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate(sequelize: Sequelize) {
    this.belongsTo(sequelize.models.Board, { as: BOARD_MODEL_NAME })
    this.hasMany(sequelize.models.Task, {as: TASKS_TABLE_NAME, foreignKey: "task_stage_id" })
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      tableName: TASK_STAGE_TABLE_NAME,
      modelName: TASK_STAGE_MODEL_NAME,
      timestamps: false
    };
  }
}
