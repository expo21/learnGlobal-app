const mongoose = require("mongoose");

const SchoolGeneraLInfo = mongoose.Schema(
  {
    id: { type: String },
    school_name: { type: String },
    school_location: { type: String },
    country: { type: String },
    country_logo: { type: String },
    school_type: { type: String },
    deciplines: { type: String },
    features: { type: String },
    type: { type: String },
    school_images: { type: String },
    single_school_image: { type: String },
    in_take: { type: String },
    school_disable: { type: String },
    School_delete: { type: String },
  },
  {
    collection: "SchoolGeneralInfo",
  }
);

module.exports = mongoose.model("SchoolGeneralInfo", SchoolGeneraLInfo);
