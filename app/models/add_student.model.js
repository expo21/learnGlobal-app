const mongoose = require("mongoose");

const AddStudentSchema = mongoose.Schema(
  {
    agent_id: { type: String },
    student_id: { type: String },
    education: { type: String },
    grade: { type: Number },
    reading: { type: Number, min: 1, max: 10 },
    writting: { type: Number, min: 1, max: 10 },
    listening: { type: Number, min: 1, max: 10 },
    speaking: { type: Number, min: 1, max: 10 },
    exam: { type: String },
  },
  {
    collection: "AddStudent",
    timestemps: true,
  }
);

module.exports = mongoose.model("AddStudent", AddStudentSchema);
