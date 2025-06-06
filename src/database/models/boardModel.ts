import { Model, DataTypes, Sequelize } from "sequelize";

export const BOARD_TABLE_NAME = "boards"
const BOARD_MODEL_NAME = "Board"

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

export class BoardModel extends Model {
  static config(sequelize: Sequelize) {
    return {
      sequelize,
      modelName: BOARD_MODEL_NAME,
      tableName: BOARD_TABLE_NAME,
      timeStamps: false
    }
  }
}