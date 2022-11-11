const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  // shortcut for create a date and update a date
  { timestamps: true }
);

module.exports = mongoose.model("Category", CategorySchema);
