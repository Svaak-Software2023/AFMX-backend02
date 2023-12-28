const ClientModel = require("../model/clientModel");
const ComplaintModel = require("../model/complaintModel");
const ComplaintRemarksModel = require("../model/complaintRemarksModel");
const RoleModel = require("../model/roleModel");

const validateAndSaveRemark = async (complaintRemarksDetails) => {
  const { complaintId, adminId, complaintAssigneeId, remarks, roleId } =
    complaintRemarksDetails;

  // Fetching complaint and client details concurrently using Promise.all
  const [complaintIds, clientIds] = await Promise.all([
    ComplaintModel.findOne({ complaintId }).select("-_id complaintId"),
    ClientModel.findOne({
      clientId: complaintAssigneeId,
      isActive: true,
    }).select("-_id clientId isActive roleId"),
  ]);

  if (!complaintIds) {
    throw new Error("Complaint ids doesn't Match");
  }

  if (!clientIds) {
    throw new Error("Neither assignee exists nor is active");
  }

  //   const roleIds = await RoleModel.findOne({
  //     roleId: clientIds.roleId,
  //     isActive: true,
  //   }).select("-_id roleId roleName");

  //   if (!roleIds) {
  //     throw new Error("Neither role exists nor is active");
  //   }

  const adminRoleIds = await RoleModel.findOne({ roleId, isActive: true });
  console.log("admin roleId", adminRoleIds);

  if (!adminRoleIds) {
    throw new Error("Neither role exists nor is active");
  }

  let roles;
  if (adminRoleIds.roleName === "Admin") {
    roles = adminRoleIds.roleName;
  } else {
    roles = adminRoleIds.roleName;
  }

  const complaintRemarksCount = await ComplaintRemarksModel.countDocuments();

  const complaintRemarksNewDetails = new ComplaintRemarksModel({
    complaintRemarksId: complaintRemarksCount + 1,
    complaintId,
    adminId,
    complaintAssigneeId,
    remarks,
    remarksCreatedBy: roles,
  });
  const complaintRemarksCreateDetails = await complaintRemarksNewDetails.save();
  return complaintRemarksCreateDetails;
};

module.exports = {
  validateAndSaveRemark,
};
