import { Request, Response } from "express";

export const createNewTask = async (req: Request, res: Response) => {
  try {
    // req.body = taskName, dueDate, recurring, assignTo (maybe)
    // const task = Task.create()
    // res.status(201).json({
    //     status: 'success',
    //     data: {
    //         task,
    //     }
    // })
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
