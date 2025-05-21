import { Request, Response } from "express";

import House from "../models/houseModel";

export const createHousehold = async (req: Request, res: Response) => {
  try {
    const { userId, houseName, houseCode } = req.body;

    const newHouse = await House.create({
      houseName,
      houseCode,
      owner: userId,
      members: [userId],
    });

    res.status(200).json({
      status: "success",
      data: {
        newHouse,
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
