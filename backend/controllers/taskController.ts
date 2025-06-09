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

type UpdateData = {
  status: string;
  completedAt?: Date;
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
    const updateData: UpdateData = { status };
    if (status === "complete") {
      updateData.completedAt = new Date();
    }

    let taskChange = await Tasks.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!taskChange) throw new Error("Task failed to complete");

    res.status(200).json({
      status: "success",
      data: {
        taskChange,
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
