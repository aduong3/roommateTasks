import express from "express";
import userRouter from "./routes/userRouter";

const app = express();

app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
