import express from "express";
import cors from "cors";

import userRouter from "./routes/userRouter";
import houseRouter from "./routes/houseRouter";
import taskRouter from "./routes/taskRouter";

const app = express();
const allowedOrigins = process.env.CORS_ORIGINS?.split(",") || [];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/house", houseRouter);
app.use("/api/v1/tasks", taskRouter);

app.all(/.*/, (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
