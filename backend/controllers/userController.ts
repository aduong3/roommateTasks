import admin from "firebase-admin";
import { Request, Response } from "express";

import User from "../models/userModel";

admin.initializeApp();

export const verifyGoogleLogIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    console.log(decodedToken);

    res.status(200).json({
      status: "success",
      data: {
        token: decodedToken,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
