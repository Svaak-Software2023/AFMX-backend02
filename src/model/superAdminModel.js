// AdminModel.js
const mongoose = require('mongoose');

const superAdminSchema = mongoose.Schema({
  adminId: {
    type: Number,
    default: 1
  },
  adminName: {
    type: String,
    default: "Rob",
  },
  adminEmail: {
    type: String,
    required: true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required: true,
  },
  // Add more fields if needed
});

const AdminModel = mongoose.model('Admin', superAdminSchema);

module.exports = AdminModel;
