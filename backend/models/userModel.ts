import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  givenName: {
    type: String,
    required: [true, "First name is required."],
  },
  familyName: {
    type: String,
    required: [true, "Last name is required."],
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
