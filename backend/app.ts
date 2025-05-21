import express from "express";
import userRouter from "./routes/userRouter";
import houseRouter from "./routes/houseRouter";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: ["http//localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/house", houseRouter);

app.all(/.*/, (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "URL not found!",
  });
});

export default app;
