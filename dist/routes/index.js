import express from "express";
import { boardRouter } from "./boardRoute";
export default function routerApi(app) {
    const router = express.Router();
    app.use("/api/v1", router);
    router.use("/boards", boardRouter);
}
