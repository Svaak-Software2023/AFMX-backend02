const mongoose = require("mongoose");

const serviceDepartmentSchema = mongoose.Schema({
  serviceDepartmentId: {
    type: Number,
    required: true,
  },
  serviceDepartmentName: {
    type: String,
    required: true,
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

module.exports = mongoose.model("ServiceDepartment", serviceDepartmentSchema);
