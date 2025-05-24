import express from "express";
import { createNewTask } from "../controllers/taskController";

const router = express.Router();

router.route("/create").post(createNewTask);

export default router;
