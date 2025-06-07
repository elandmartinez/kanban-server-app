import { DataTypes, Model } from "sequelize";
import { BOARD_TABLE_NAME } from "./boardModel.js";
export const TASK_STAGE_TABLE_NAME = "task_stages";
export const TASK_STAGE_MODEL_NAME = "TaskStage";
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
    board: {
        type: DataTypes.STRING(128),
        allowNull: false,
        references: {
            model: BOARD_TABLE_NAME,
            key: "id"
        },
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
export class TaskStageModel extends Model {
    static associate(sequelize) {
        this.belongsTo(sequelize.models.Board, {
            as: BOARD_TABLE_NAME
        });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TASK_STAGE_TABLE_NAME,
            modelName: TASK_STAGE_MODEL_NAME,
            timeStamp: false
        };
    }
}
