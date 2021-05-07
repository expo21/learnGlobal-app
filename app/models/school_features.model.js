const mongoose = require("mongoose");

const SchoolFeatureSchema = mongoose.Schema(
  {
    id: { type: String },
    school_id: { type: String },
    accomodation: { type: String },
    work_permit: { type: String },
    program_cooporation: { type: String },
    work_while_study: { type: String },
    condition_offer_letter: { type: String },
    library: { type: String },
  },
  {
    collection: "SchoolFeatures",
  }
);

module.exports = mongoose.model("SchoolFeatures", SchoolFeatureSchema);
