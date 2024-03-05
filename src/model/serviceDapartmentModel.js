const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceDepartmentSchema = new Schema({
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

const ServiceDepartmentModel = mongoose.model("ServiceDepartment", serviceDepartmentSchema);

module.exports = ServiceDepartmentModel;
