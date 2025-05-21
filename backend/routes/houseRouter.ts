import express from "express";
import { createHousehold } from "../controllers/houseController";

const router = express.Router();

router.route("/").post(createHousehold);

export default router;
