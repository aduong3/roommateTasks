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

    const { email, picture, name } = decodedToken;

    // console.log("decodedToken:", decodedToken);

    const user = await User.findOne({ email });

    if (user) {
      // console.log(user);
      res.status(200).json({
        status: "success",
        data: {
          user,
        },
      });
    } else {
      const newUser = await User.create({ email, photo: picture, name });
      res.status(200).json({
        status: "success",
        data: {
          user: newUser,
        },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({
        status: "failed",
        message: err.message,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: err,
      });
    }
  }
};
