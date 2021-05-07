const mongoose = require("mongoose");

const ProgramFeeSchema = mongoose.Schema(
  {
    id: { type: String },
    other_fees: { type: String },
    application_fees: { type: String },
    pay_tuition: { type: String },
    pay_tution_semester: { type: String },
    living_cost: { type: String },
    programs_course_id: { type: String },
  },
  {
    collection: "ProgramsFees",
  }
);

module.exports = mongoose.model("ProgramsFees", ProgramFeeSchema);
