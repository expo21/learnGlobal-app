const mongoose = require("mongoose");

const CountryPageSchema = mongoose.Schema(
  {
    id: { type: String },
    country_name: { type: String },
    country_image: { type: String },
    heading: { type: String },
    content: { type: String },
    country_description: { type: String },
    delete_status: { type: String },
  },
  {
    collection: "CountryPage",
  }
);

module.exports = mongoose.model("CountryPage", CountryPageSchema);
