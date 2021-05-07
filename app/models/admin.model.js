const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    image: { type: String },
    phone_number: { type: Number },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    confirmation: { type: String },
    email_confirmation: { type: String },
    address: { type: String },
  },
  {
    collection: "AdminInfo",
    timestemps: true,
  }
);
module.exports = mongoose.model("AdminInfo", AdminSchema);
