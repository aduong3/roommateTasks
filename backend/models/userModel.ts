import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Your name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  photo: {
    type: String,
    required: [true, "Photo should be provided by Google Sign In."],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
