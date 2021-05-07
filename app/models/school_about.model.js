const mongoose = require("mongoose");

const SchoolAboutSchema = mongoose.Schema(
  {
    id: { type: String },
    about: { type: String },
    total_student: { type: String },
    int_student: { type: String },
    school_genral_id: { type: String },
  },
  {
    collection: "SchoolAbout",
  }
);

module.exports = mongoose.model("SchoolAbout", SchoolAboutSchema);
