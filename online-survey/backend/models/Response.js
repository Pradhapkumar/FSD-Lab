const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
  {
    answers: {
      type: Map,
      of: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Response", responseSchema);

