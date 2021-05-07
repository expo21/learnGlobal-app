const mongoose = require("mongoose");

const ProgramCoursesSchema = mongoose.Schema(
  {
    id: { type: String },
    exam: { type: String },
    course: { type: String },
    program_level: { type: String },
    program_description: { type: String },
    admission_requirements: { type: String },
    duration: { type: String },
    percentage_required: { type: String },
    band_required: { type: String },
    eap: { type: String },
    pte: { type: String },
    tofel: { type: String },
    ielts_acceptence: { type: String },
    listening: { type: String },
    writing: { type: String },
    reading: { type: String },
    speaking: { type: String },
    module: { type: String },
    stream: { type: String },
    funds: { type: String },
    remarks: { type: String },
    stream_id: { type: String },
    school_id: { type: String },
    school_course: { type: String },
    user_type: { type: String },
    delete_status: { type: String },
  },
  {
    collection: "ProgramsCourse",
  }
);

module.exports = mongoose.model("ProgramsCourse", ProgramCoursesSchema);
