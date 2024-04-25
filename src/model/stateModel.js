const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stateSchema = new Schema({
  stateId: {
    type: Number,
    required: true,
  },
  countryId: {
    type: Schema.Types.Number,
    ref: 'Country',
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
  isFlag: {
    type: Boolean,
    default: false,
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

// Ensure index for GeoJSON Point type for efficient querying
stateSchema.index({ latLng: '2dsphere' });

const StateModel = mongoose.model("State", stateSchema);

module.exports = StateModel;
