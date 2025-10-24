const mongoose = require("mongoose");
const Plans = require("../enum/userRole");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  plan: {
    type: String,
    enum: [Plans.FREE, Plans.PRO],
    default: Plans.FREE,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
