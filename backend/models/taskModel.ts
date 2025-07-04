import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every task needs a name!"],
  },
  houseId: {
    type: mongoose.Schema.ObjectId,
    ref: "House",
    required: [true, "Every task belongs to some household."],
  },
  recurrence: {
    type: String,
    default: "none",
    enum: ["none", "weekly", "monthly"],
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  dueDate: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
  status: {
    type: String,
    default: "not_started",
    enum: ["not_started", "in_progress", "complete"],
  },
});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
