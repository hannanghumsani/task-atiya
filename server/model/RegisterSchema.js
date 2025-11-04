const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
    },
    address: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Register", registerSchema);
