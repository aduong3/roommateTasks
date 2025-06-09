import cron from "node-cron";
import Tasks from "../models/taskModel";

function isLastDayOfMonth(date = new Date()): boolean {
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);
  return tomorrow.getDate() === 1;
}

async function resetManyTasks(recurrenceType: "weekly" | "monthly") {
  const filter = {
    status: "complete",
    recurrence: recurrenceType === "weekly" ? "weekly" : "monthly",
  };

  await Tasks.updateMany(filter, {
    status: "not_started",
    completedAt: null,
  });
}

export function scheduleResetChores() {
  // We want it to run at the latest as possible which would be 11:59PM on Sunday or last day of month.

  cron.schedule("59 23 * * *", async () => {
    try {
      const now = new Date();
      const isSunday = now.getDay() === 0; // Sunday is 0
      const isLastDay = isLastDayOfMonth(now);

      if (isSunday) {
        console.log("Weekly reset");
        await resetManyTasks("weekly");
      }
      if (isLastDay) {
        console.log("Monthly reset");
        await resetManyTasks("monthly");
      }
      console.log("Deleting tasks");
      const deletedTasks = await Tasks.deleteMany({
        status: "complete",
        recurrence: "none",
      });
      console.log(
        `Deleted ${deletedTasks.deletedCount} completed, non-recurring tasks!`
      );
    } catch (err) {
      if (err instanceof Error)
        console.error("Failed to reset weekly chores:", err.message);
      else console.error("Failed to reset weekly chores:", err);
    }
  });
}
