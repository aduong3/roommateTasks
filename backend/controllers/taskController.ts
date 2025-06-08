import { Request, Response } from "express";
import Tasks from "../models/taskModel";
import mongoose from "mongoose";

type Task = {
  name: string;
  dueDate: Date;
  recurrence: string;
  assignedTo: string;
  houseId: string;
};

export const createNewTask = async (req: Request, res: Response) => {
  try {
    // req.body = taskName, dueDate, recurrence, assignTo (maybe)
    const { name, dueDate, recurrence, assignedTo, houseId }: Task = req.body;

    const task = await Tasks.create({
      name,
      dueDate,
      recurrence,
      assignedTo,
      houseId: new mongoose.Types.ObjectId(houseId),
    });
    res.status(201).json({
      status: "success",
      data: {
        task,
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

export const changeTaskStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!id) {
      throw new Error("Task is not found!");
    }

    const taskComplete = await Tasks.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!taskComplete) throw new Error("Task failed to complete");

    res.status(200).json({
      status: "success",
      data: {
        taskComplete,
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
