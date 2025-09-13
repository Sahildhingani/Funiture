const mongoose = require("mongoose");

const ForgetPassSchema = new mongoose.Schema({
  UserEmail: {
    type: String,
    required: true,
    unique: true
  },
  Code: {
    type: Number,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 40   // document will auto-delete after 40 seconds
  }
});

const ForgetPassModel = mongoose.model("ForgetPassModel", ForgetPassSchema);

module.exports = ForgetPassModel;
