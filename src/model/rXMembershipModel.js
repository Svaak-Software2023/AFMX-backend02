const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RxMemberShipeSchema = new Schema({
  rxMemberShipId: {
    type: Number,
    required: true,
  },
  user: {
    type: Schema.Types.Number,
    ref: "Client",
    required: true,
  },
  memberShipName: {
    type: String,
    required: true,
  },
  memberShipType: {
    type: String,
    required: true,
  },
  memberShipPlan: {
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
  expireDate: {
    type: Date,
    default: Date.now,
  },
  stripeSessionId: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    required: true,
  },
});

// Define pre hook to update updatedDate before findOneAndUpdate
RxMemberShipeSchema.pre("findOneAndUpdate", function (next) {
  this._update.updatedDate = new Date(); // Set updatedDate to current date/time
  next();
});

const RxMemberShipeModel = mongoose.model("RxMemberShip", RxMemberShipeSchema);

module.exports = RxMemberShipeModel;
