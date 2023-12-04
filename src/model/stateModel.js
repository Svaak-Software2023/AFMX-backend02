const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  stateId: {
    type: Number,
    required: true,
  },
  countryId: {
    type: Number,
    required: true,
  },
  stateName: {
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
stateSchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});

module.exports = mongoose.model("State", stateSchema);
