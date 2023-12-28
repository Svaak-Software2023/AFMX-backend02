const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roleSchema = new Schema({
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
  
   const RoleModel = mongoose.model("role", roleSchema);
  
  module.exports = RoleModel;