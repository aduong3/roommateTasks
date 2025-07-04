import { Request, Response } from "express";

import House from "../models/houseModel";
import User from "../models/userModel";
import mongoose from "mongoose";
import Tasks from "../models/taskModel";

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

    const membersWithTasks = await Promise.all(
      listOfMembers.map(async (user) => {
        const tasks = await Tasks.find({
          assignedTo: user._id,
          houseId: house._id,
        });
        return {
          userId: user._id,
          name: user.name,
          tasks,
        };
      })
    );

    res.status(200).json({
      status: "success",
      data: {
        membersWithTasks,
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

export const joinHousehold = async (req: Request, res: Response) => {
  try {
    const { userId, houseCode } = req.body;

    const house = await House.findOne({ houseCode });

    if (!house) throw new Error("This house does not exist!");

    await House.findByIdAndUpdate(house._id, {
      $addToSet: { members: userId },
    });

    await User.findByIdAndUpdate(
      userId,
      { houseId: house._id, house: house.houseName },
      { new: true }
    );

    res.status(200).json({
      status: "success",
      message: "You have successfully joined a household!",
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
