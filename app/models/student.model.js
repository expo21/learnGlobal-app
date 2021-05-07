const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema(
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
    agent_id: { type: String },
    blocked: { type: Boolean, Default: false },
  },
  {
    collection: "Student",
    timestamps: true,
  }
);

module.exports = mongoose.model("Student", StudentSchema);
