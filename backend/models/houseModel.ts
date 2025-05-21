import mongoose from "mongoose";

const houseSchema = new mongoose.Schema({
  houseName: {
    type: String,
    required: [true, "Put in a name for your house!"],
  },
  houseCode: {
    type: String,
    required: [true, "Insert a code for others to join!"],
  },
  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  tasks: {
    type: mongoose.Schema.ObjectId,
    ref: "Tasks",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const House = mongoose.model("House", houseSchema);

export default House;
