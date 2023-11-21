const mongoose = require("mongoose");

const departmentSchema = mongoose.Schema({
  departmentId: {
    type: Number,
    required: true,
  },
  departmentName: {
    type: String,
    required: true,
  },
  departmentDescription: {
    type: String,
    default: "",
  },
  jobLocation: {
    type: String,
    default: "",
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("department", departmentSchema);
