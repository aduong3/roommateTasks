import { Request, Response } from "express";

import House from "../models/houseModel";
import User from "../models/userModel";
import mongoose from "mongoose";

export const createHousehold = async (req: Request, res: Response) => {
  try {
    const { userId, houseName, houseCode } = req.body;

    const newHouse = await House.create({
      houseName,
      houseCode,
      owner: new mongoose.Types.ObjectId(userId),
    });

    await House.findByIdAndUpdate(newHouse._id, {
      $push: { members: userId },
    });

    await User.findByIdAndUpdate(
      userId,
      { houseId: newHouse._id, house: newHouse.houseName },
      { new: true }
    );

    res.status(201).json({
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

export const getUsersInHousehold = async (req: Request, res: Response) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) {
      throw new Error("User does not belong to any household.");
    }
    const houseMembers = house.members;
    const listOfMembers = await User.find(
      { _id: { $in: houseMembers } },
      "name"
    );
    res.status(200).json({
      status: "success",
      data: {
        listOfMembers,
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
