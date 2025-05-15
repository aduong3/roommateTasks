import admin from "firebase-admin";
import { Request, Response } from "express";
import serviceAccount from "../firebase/firebase-service-account.json";

import User from "../models/userModel";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const verifyGoogleLogIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // console.log("decodedToken:", decodedToken);
    // const uid = decodedToken.uid;

    res.status(200).json({
      status: "success",
      data: {
        // token: decodedToken,
        // uid,
        message: "Test",
      },
    });
  } catch (err: any) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
