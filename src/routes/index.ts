import express from "express"
import passport from "passport"
import boardRouter from "./boardRoute.js"
import taskRouter from "./taskRoute.js"
import taskStageRouter from "./taskStageRoute.js"
import userRouter from "./userRoute.js"
import authRouter from "./authRoute.js"


export default function routerApi (app: express.Express) {
  const router = express.Router()

  app.use("/api/v1", router)
  router.use(
    "/boards",
    passport.authenticate("jwt", {session: false}),
    boardRouter
  )
  router.use(
    "/tasks",
    passport.authenticate("jwt", {session: false}),
    taskRouter)
  router.use(
    "/task-stages",
    passport.authenticate("jwt", {session: false}),
    taskStageRouter
  )
  router.use(
    "/auth",
    passport.authenticate("local", { session: false }),
    authRouter
  )
  router.use("/users", userRouter)
}