const mongoose = require("mongoose");

const ProgramTimeSchema = mongoose.Schema(
  {
    id: { type: String },
    acceptance_letter: { type: String },
    Land_USA: { type: String },
    start_program: { type: String },
    processing_time: { type: String },
    programs_fees_id: { type: String },
  },
  {
    collection: "ProgramsTime",
  }
);

module.exports = mongoose.model("ProgramsTime", ProgramTimeSchema);
