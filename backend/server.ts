import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.ts";

dotenv.config({ path: "./.env" });

const DB = process.env.EXPO_PUBLIC_DATABASE_URI!;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
