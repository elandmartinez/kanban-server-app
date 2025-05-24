import { taskSchema, TaskModel } from "./taskModel";
import { taskStageSchema, TaskStageModel } from "./taskStageModel"
import { boardSchema, BoardModel } from "./boardModel"
import { userSchema, UserModel } from "./userModel"

export function setUpModels (sequelize) {
  TaskModel.init(taskSchema, TaskModel.config(sequelize))
  TaskStageModel.init(taskStageSchema, TaskStageModel.config(sequelize))
  BoardModel.init(boardSchema, BoardModel.config(sequelize))
  UserModel.init(userSchema, UserModel.config(sequelize))

  TaskModel.associate(sequelize.models)
  TaskStageModel.associate(sequelize.models)
  UserModel.associate(sequelize.models)
}

