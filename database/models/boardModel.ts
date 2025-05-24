import { Model, DataTypes } from "sequelize";

const BOARD_TABLE_NAME = "boards"
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
    defaultValue: new Date("YY-MM-dd")
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: "updated_at",
    alloNull: false,
    defaultValue: new Date("YY-MM-dd")
  },
}

export class BoardModel extends Model {
  static config(sequelize) {
    return {
      sequelize,
      modelName: BOARD_MODEL_NAME,
      tableName: BOARD_TABLE_NAME,
      timeStamps: false
    }
  }
}