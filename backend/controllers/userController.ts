import admin from "firebase-admin";
import { Request, Response } from "express";
import serviceAccount from "../firebase/firebase-service-account.json";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

const jwt_secret = process.env.JWT_SECRET as string;

const signToken = (id: string): string => {
  return jwt.sign({ id }, jwt_secret, { expiresIn: "1d" });
};

export const verifyGoogleLogIn = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(idToken);

    const { email, picture, name } = decodedToken;

    // console.log("decodedToken:", decodedToken);

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        photo: picture,
        name,
        // house: null,
        // houseId: null,
      });
    }

    const token = signToken(user._id.toString());

    res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
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
