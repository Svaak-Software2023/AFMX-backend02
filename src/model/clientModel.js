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
  clientPrifix: {
    type: String,
    default: "",
  },
  clientFirstName: {
    type: String,
    required: true,
  },
  clientMiddleName: {
    type: String,
    default: "",
  },
  clientLastName: {
    type: String,
    default: "",
  },
  clientSuffix: {
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
  clientAddress1: {
    type: String,
    required: true,
  },
  clientAddress2: {
    type: String,
    default: "",
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
  clientLinkedInProfile: {
    type: String,
    default: "",
  },
  clientWebsite: {
    type: String,
    default: "",
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
