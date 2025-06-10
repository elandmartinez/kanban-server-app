import { taskSchema, TaskModel } from "./taskModel.js";
import { taskStageSchema, TaskStageModel } from "./taskStageModel.js";
import { boardSchema, BoardModel } from "./boardModel.js";
import { userSchema, UserModel } from "./userModel.js";
export function setUpModels(sequelize) {
    BoardModel.init(boardSchema, BoardModel.config(sequelize));
    TaskStageModel.init(taskStageSchema, TaskStageModel.config(sequelize));
    TaskModel.init(taskSchema, TaskModel.config(sequelize));
    UserModel.init(userSchema, UserModel.config(sequelize));
    BoardModel.associate(sequelize);
    TaskStageModel.associate(sequelize);
    TaskModel.associate(sequelize);
    UserModel.associate(sequelize);
}
