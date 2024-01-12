const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
});

module.exports = model("User", userSchema);
