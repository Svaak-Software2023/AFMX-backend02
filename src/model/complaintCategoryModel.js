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
    complaintCategoryDescription: {
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

  
// Define pre hook to update updatedDate before findOneAndUpdate
complaintCategorySchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});
  
  module.exports = mongoose.model("complaintCategory", complaintCategorySchema);
  