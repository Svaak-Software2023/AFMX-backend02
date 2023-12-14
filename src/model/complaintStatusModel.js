const mongoose = require('mongoose');

const complaintStatusSchema = mongoose.Schema({
    complaintStatusId: {
      type: Number,
      required: true,
    },
    complaintStatusName: {
      type: String,
      enum: ['Open','Not Yet Started','In Review', 'In Progress','On Hold','Completed'],
      default: 'Open'
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
  