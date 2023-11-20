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

  // Check total Number of documents(records) in the role collection(table)
  let roleCount = 0;
  roleCount = await roleModel.find().count();

  const newRoleDetail = await roleModel({
    //Save in role Model
    roleId: roleCount + 1,
    roleName,
    roleDescription,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing role
  const roleExists = await roleModel.findOne({
    roleName,
  });

  if (roleExists) {
    throw new Error("Role exists");
  } else {
    const newRoleDetails = await newRoleDetail.save();
    return newRoleDetails;
  }
};

//Update role
const updateRole = async (
  roleId,
  updateRoleDetail
) => {
  // Check existing role
  const roleData = await roleModel.findOne({
    roleId: roleId,
  });
  if (!roleData) {
    throw new Error("Role not found.");
  }

  const updatedRole =
    await roleModel.findOneAndUpdate(
      { roleId: roleId },
      { $set: updateRoleDetail },
      { new: true }
    );
  if (!updatedRole) {
    throw new Error("Role could not updated");
  }
  return updatedRole;
};

//Delete role
const deleteRole = async (
  roleId,
  deleteRoleDetail
) => {
  // Check Existing roleId
  const roleData = await roleModel.findOne({
    roleId: roleId,
  });

  if (!roleData) {
    throw new Error("Role not found.");
  }
  // update only if isActive is true
  const updateRoleData =
    await roleModel.findOneAndUpdate(
      { roleId: roleId },
      { $set: deleteRoleDetail },
      { new: true }
    );

  if (!updateRoleData) {
    throw new Error("Role could not de-activate");
  }

  return updateRoleData;
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
};