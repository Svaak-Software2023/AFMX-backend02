const mongoose = require('mongoose');

const roleSchema = mongoose.Schema({
    roleId: {
      type: Number,
      required: true,
    },
    roleName: {
      type: String,
      required: true,
    },
    roleDescription: {
      type: String,
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
  
  module.exports = mongoose.model("role", roleSchema);
  