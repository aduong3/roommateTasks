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
});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
