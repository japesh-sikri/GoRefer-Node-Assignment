const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;