const mongoose = require("mongoose");

// Define a function to calculate the date for one week from now
function twoWeekFromNow() {
  const now = new Date();
  const oneWeekLater = new Date(now);
  oneWeekLater.setDate(now.getDate() + 15);
  return oneWeekLater;
}

const advertiesSchema = mongoose.Schema({
  advertiesId: {
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
  advertiesPage: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  advertiesLocation: {
    type: String,
    required: true,
  },
  advertiesImage: {
    type: Array,
    required: true,
  },
  advertiesImageAltText: {
    type: String,
    required: true,
  },
  advertiesImageLink: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: twoWeekFromNow, // Date in two week from now
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

module.exports = mongoose.model("Adverties", advertiesSchema);
