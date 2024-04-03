const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const miniTvSchema = new Schema({
  miniTvId: {
    type: Number,
    required: true,
  },
  miniTvMedia: {
    type: String,
    required: true,
  },
  mediaUrl: {
    type: String,
    default: '',
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


const MiniTvModel =  mongoose.model('MiniTv', miniTvSchema);

module.exports = MiniTvModel;