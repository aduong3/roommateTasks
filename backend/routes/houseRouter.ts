import express from "express";
import {
  createHousehold,
  getUsersInHousehold,
} from "../controllers/houseController";

const router = express.Router();

router.route("/").post(createHousehold);

router.route("/:id").get(getUsersInHousehold);

export default router;
