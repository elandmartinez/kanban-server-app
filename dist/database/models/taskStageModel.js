import { DataTypes, Model } from "sequelize";
import { BOARD_MODEL_NAME } from "./boardModel";
const TASK_STAGE_TABLE_NAME = "task_stages";
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
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: BOARD_MODEL_NAME,
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
};
export class TaskStageModel extends Model {
    static associate(sequelize) {
        this.belongsTo(sequelize.models.Board, {
            as: "taskStage"
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
