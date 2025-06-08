import express from "express";
import { changeTaskStatus, createNewTask } from "../controllers/taskController";

const router = express.Router();

router.route("/").post(createNewTask);

router.route("/:id/status").patch(changeTaskStatus);

export default router;
