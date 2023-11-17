const mongoose = require('mongoose');

const complaintCategorySchema = mongoose.Schema({
    complaintCategoryId: {
      type: Number,
      required: true,
    },
    complaintCategoryName: {
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
  
  module.exports = mongoose.model("complaintCategory", complaintCategorySchema);
  