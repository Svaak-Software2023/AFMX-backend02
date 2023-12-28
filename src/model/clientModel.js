const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  clientId: {
    type: Number,
    required: true,
  },
  roleId: {
    type: Number,
    required: true,
  },
  clientFirstName: {
    type: String,
    required: true,
  },
  clientLastName: {
    type: String,
    default: "",
  },
  clientProfileImage: {
    type: String,
    required: true,
  },
  clientSSN: {
    type: String,
    required: true,
  },
  clientAddress: {
    type: String,
    required: true,
  },
  clientPostalCode: {
    type: String,
    default: "",
  },
  clientCity: {
    type: String,
    default: "",
  },
  stateId: {
    type: Number,
    default: "",
  },
  countryId: {
    type: Number,
    default: "",
  },
  clientPassword: {
    type: String,
    required: true,
  },
  clientPhone: {
    type: String,
    default: "",
  },
  clientEmail: {
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
  token: {
    type: String,
    default: "",
  },
});
const ClientModel = mongoose.model("Client", clientSchema);

module.exports = ClientModel;
