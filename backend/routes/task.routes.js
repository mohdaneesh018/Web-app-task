import express from "express";
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
} from "../controllers/task.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getTasks);
router.post("/create", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;