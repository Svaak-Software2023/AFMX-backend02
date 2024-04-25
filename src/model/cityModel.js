const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citySchema = new Schema({
  cityId: {
    type: Number,
    required: true,
  },
  stateId: {
    type: Schema.Types.Number,
    ref: 'State',
    required: true,
  },
  latLng: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: { type: [], default: [0.0, 0.0] },
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

// Ensure index for GeoJSON Point type for efficient querying
citySchema.index({ latLng: '2dsphere' });

const cityModel = mongoose.model("City", citySchema);

module.exports = cityModel;
