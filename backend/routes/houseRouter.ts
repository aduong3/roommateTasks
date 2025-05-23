import express from "express";
import {
  createHousehold,
  getUsersInHousehold,
  joinHousehold,
} from "../controllers/houseController";

const router = express.Router();

router.route("/").post(createHousehold);

router.route("/join").post(joinHousehold);

router.route("/:id").get(getUsersInHousehold);

export default router;
