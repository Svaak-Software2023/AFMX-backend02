const mongoose = require('mongoose');

const complaintStatusSchema = mongoose.Schema({
    complaintStatusId: {
      type: Number,
      required: true,
    },
    complaintStatusName: {
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
  
  module.exports = mongoose.model("complaintStatus", complaintStatusSchema);
  