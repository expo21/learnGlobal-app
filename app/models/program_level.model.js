const mongoose = require("mongoose");

const ProgramLevelSchema = mongoose.model(
  {
    id: { type: String },
    program_type: { type: String },
  },
  {
    collection: "ProgramLevel",
  }
);

module.exports = mongoose.model("ProgramLevel", ProgramLevelSchema);
