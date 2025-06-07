import { taskSchema, TaskModel } from "./taskModel.js";
import { taskStageSchema, TaskStageModel } from "./taskStageModel.js";
import { boardSchema, BoardModel } from "./boardModel.js";
import { userSchema, UserModel } from "./userModel.js";
export function setUpModels(sequelize) {
    TaskModel.init(taskSchema, TaskModel.config(sequelize));
    TaskStageModel.init(taskStageSchema, TaskStageModel.config(sequelize));
    BoardModel.init(boardSchema, BoardModel.config(sequelize));
    UserModel.init(userSchema, UserModel.config(sequelize));
    TaskModel.associate(sequelize);
    TaskStageModel.associate(sequelize);
    UserModel.associate(sequelize);
}
