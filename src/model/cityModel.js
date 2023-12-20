const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  cityId: {
    type: Number,
    required: true,
  },
  stateId: {
    type: Number,
    required: true,
  },
  isCity: {
    type: Boolean,
    required: true,
  },
  cityName: {
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
citySchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});

module.exports = mongoose.model("City", citySchema);
