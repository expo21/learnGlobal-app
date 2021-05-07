const mongoose = require("mongoose");

const StreamSchema = mongoose.Schema(
  {
    programs_stream: { type: String },
    delete_status: { type: String },
  },
  {
    collection: "Stream",
    timestamps: true,
  }
);

module.exports = mongoose.model("Stream", StreamSchema);
