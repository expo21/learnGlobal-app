const mongoose = require("mongoose");

const SchoolLogoSchema = mongoose.Schema(
  {
    id: { type: String },
    founded: { type: String },
    logo: { type: String },
    school_about_id: { type: String },
  },
  {
    collection: "SchoolLogo",
  }
);

module.exports = mongoose.model("SchoolLogo", SchoolLogoSchema);
