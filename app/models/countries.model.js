const mongoose = require("mongoose");

const CountrySchema = mongoose.Schema(
  {
    id: { type: Number },
    country_code: { type: String },
    country_name: { type: String },
  },
  {
    collection: "Countries",
  }
);

module.exports = mongoose.model("Countries", CountrySchema);
