const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintStatusSchema = new Schema({
  complaintStatusId: {
    type: Number,
    required: true,
  },
  complaintStatusName: {
    type: String,
    enum: [
      "Open",
      "Not Yet Started",
      "In Review",
      "In Progress",
      "On Hold",
      "Completed",
    ],
    default: "Open",
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

const complaintStatusModel = mongoose.model("complaintStatus", complaintStatusSchema);

module.exports = complaintStatusModel;
