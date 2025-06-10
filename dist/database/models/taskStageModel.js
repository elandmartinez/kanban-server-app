import { Model, DataTypes } from "sequelize";
import { BOARD_TABLE_NAME } from "./boardModel.js";
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
export class TaskStageModel extends Model {
    static associate(sequelize) {
        this.belongsTo(sequelize.models.Board, { as: BOARD_TABLE_NAME });
        this.hasMany(sequelize.models.Task, { as: TASKS_TABLE_NAME, foreignKey: "task_stage_id" });
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: TASK_STAGE_TABLE_NAME,
            modelName: TASK_STAGE_MODEL_NAME,
            timestamps: false
        };
    }
}
