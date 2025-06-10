import { Model, DataTypes, Sequelize, Optional } from "sequelize";
import { TASK_STAGE_TABLE_NAME } from "./taskStageModel.js";

export const BOARD_TABLE_NAME = "boards"
export const BOARD_MODEL_NAME = "Board"

export const boardSchema = {
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
  createdAt: {
    type: DataTypes.DATE,
    field: "created_at",
    alloNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
    alloNull: false,
    defaultValue: DataTypes.NOW
  },
}

export interface BoardAttributes {
  id: string,
  name: string
}

export interface BoardCreationAttributes extends Optional<BoardAttributes, 'id'> {}

export class BoardModel extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static associate (sequelize: Sequelize) {
    this.hasMany(sequelize.models.TaskStage, {as: TASK_STAGE_TABLE_NAME, foreignKey: "board_id"})
  }

  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: BOARD_MODEL_NAME,
      tableName: BOARD_TABLE_NAME,
      timeStamps: false
    }
  }
}