const mongoose = require("mongoose");

// Define a function to calculate the date for one week from now
function twoWeekFromNow() {
  const now = new Date();
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 15);
  return oneWeekLater;
}

const advertiseSchema = mongoose.Schema({
  advertiseId: {
    type: Number,
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  businessURL: {
    type: String,
    required: true,
  },
  advertisePage: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  advertiseLocation: {
    type: String,
    required: true,
  },
  advertiseImage: {
    type: Array,
    required: true,
  },
  advertiseImageAltText: {
    type: String,
    required: true,
  },
  advertiseImageLink: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    default: twoWeekFromNow, // Date in two week from now
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    required: true,
  },
  clientId: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

// Define pre hook to update updatedDate before findOneAndUpdate
advertiseSchema.pre('findOneAndUpdate', function(next) {
  // const update = this.getUpdate();

  // // Check if startDate is being updated
  // if (update.startDate !== undefined) {
  //   // If startDate is provided, update the startDate
  //   this._update.startDate = update.startDate;
  // }

  // // Skip updating createdDate
  // delete this._update.createdDate;

  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});

module.exports = mongoose.model("Advertise", advertiseSchema);
