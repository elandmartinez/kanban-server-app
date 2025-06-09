import express from "express"
import { boardRouter } from "./boardRoute.js"
import { taskRouter } from "./taskRoute.js"
import { taskStageRouter } from "./taskStageRoute.js"
import { userRouter } from "./userRoute.js"


export default function routerApi (app: express.Express) {
  const router = express.Router()

  app.use("/api/v1", router)
  router.use("/boards", boardRouter)
  router.use("/tasks", taskRouter)
  router.use("/task-stages", taskStageRouter)
  router.use("/users", userRouter)
}