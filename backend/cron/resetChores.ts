import cron from "node-cron";
import Tasks from "../models/taskModel";

function isLastDayOfMonth(date = new Date()): boolean {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow.getDate() === 1;
}
