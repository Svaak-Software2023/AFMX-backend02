const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  countryId: {
    type: Number,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  countryName: {
    type: String,
    required: true,
  },
  countryShortName: {
    type: String,
    required: true,
  },
  countryPhoneCode: {
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
countrySchema.pre('findOneAndUpdate', function(next) {
  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});

const CountryModel = mongoose.model("Country", countrySchema);

module.exports = CountryModel;
