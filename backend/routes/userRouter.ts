import express from "express";
import { verifyGoogleLogIn } from "../controllers/userController";

const router = express.Router();

router.route("/google/verify").post(verifyGoogleLogIn);

export default router;
