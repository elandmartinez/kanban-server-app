import express from "express"
import { boardRouter } from "./boardRoute.js"

export default function routerApi (app: express.Express) {
  const router = express.Router()

  app.use("/api/v1", router)
  router.use("/boards", boardRouter)
}