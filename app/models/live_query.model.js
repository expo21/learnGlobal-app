const mongoose = require("mongoose");

const LiveQuerySchema = mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: { type: String },
    mobile: { type: Number },
    destination: { type: String },
  },
  {
    collection: "LiveQuery",
    timestamps: true,
  }
);

module.exports = mongoose.model("LiveQuery", LiveQuerySchema);
