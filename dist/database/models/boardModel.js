import { Model, DataTypes } from "sequelize";
import { TASK_STAGE_TABLE_NAME } from "./taskStageModel.js";
export const BOARD_TABLE_NAME = "boards";
const BOARD_MODEL_NAME = "Board";
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
};
export class BoardModel extends Model {
    static associate(sequelize) {
        this.hasMany(sequelize.models.TaskStages, { as: TASK_STAGE_TABLE_NAME, foreignKey: "board_id" });
    }
    static config(sequelize) {
        return {
            sequelize,
            modelName: BOARD_MODEL_NAME,
            tableName: BOARD_TABLE_NAME,
            timeStamps: false
        };
    }
}
