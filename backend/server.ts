import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
import app from "./app.ts";

const DB = process.env.DATABASE_URI!;

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
