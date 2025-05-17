import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Every task needs a name!"],
  },
  household: {
    type: mongoose.Schema.ObjectId,
    ref: "House",
    required: [true, "Every task belongs to some household."],
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  dueDate: {
    type: Date,
  },
  completed: {
    type: Boolean,
  },
});

const Tasks = mongoose.model("Tasks", taskSchema);

export default Tasks;
