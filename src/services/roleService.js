const { errorMsg } = require("../const/errorHelper.js");
const roleModel = require("../model/roleModel.js");

//Create role
const createRole = async (roleDetail) => {
  const {
    //Field values from UI
    roleName,
    roleDescription,
    createdDate,
    updatedDate,
    isActive,
  } = roleDetail;

  // Check Existing role
  const roleExists = await roleModel.findOne({
    roleName,
  });

  if (roleExists) {
    throw new Error(errorMsg.ROLE_EXISTS);
  }

  // Find the largest existing roleId
  const maxRoleCount = await roleModel.findOne(
    {},
    { roleId: 1 },
    { sort: { roleId: -1 } }
  );

  // Calculate the next roleId
  const nextRoleId = maxRoleCount
    ? maxRoleCount.roleId + 1
    : 1;

  const newRoleDetail = new roleModel({
    //Save in role Model
    roleId: nextRoleId,
    roleName,
    roleDescription,
    createdDate,
    updatedDate,
    isActive,
  });

  const newRoleDetails = await newRoleDetail.save();
  return newRoleDetails;
};

//Update role
const updateRole = async (roleId, updateRoleDetail) => {
  // Check existing role
  const roleData = await roleModel.findOne({
    roleId: roleId,
  });
  if (!roleData) {
    throw new Error(errorMsg.ROLE_NOT_FOUND);
  }

  const updatedRole = await roleModel.findOneAndUpdate(
    { roleId: roleId },
    { $set: updateRoleDetail },
    { new: true }
  );
  if (!updatedRole) {
    throw new Error(errorMsg.ROLE_NOT_FOUND);
  }
  return updatedRole;
};

//Delete role
const deleteRole = async (roleId, deleteRoleDetail) => {
  // Check Existing roleId
  const roleData = await roleModel.findOne({
    roleId: roleId,
  });

  if (!roleData) {
    throw new Error(errorMsg.ROLE_NOT_FOUND);
  }
  // update only if isActive is true
  const updateRoleData = await roleModel.findOneAndUpdate(
    { roleId: roleId },
    { $set: deleteRoleDetail },
    { new: true }
  );

  if (!updateRoleData) {
    throw new Error(errorMsg.ROLE_NOT_FOUND);
  }

  return updateRoleData;
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
};
