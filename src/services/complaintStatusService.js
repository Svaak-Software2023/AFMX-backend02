const { errorMsg } = require("../const/errorHelper.js");
const ComplaintStatusModel = require("../model/complaintStatusModel.js");

//Create ComplaintStatus
const createComplaintStatus = async (complaintStatusDetail) => {
  const {
    //Field values from UI
    complaintStatusName,
    createdDate,
    updatedDate,
    isActive,
  } = complaintStatusDetail;

  // // Check Existing ComplaintStatus
  // const complaintStatusExists = await ComplaintStatusModel.findOne({
  //   complaintStatusName,
  // });

  // if (complaintStatusExists) {
  //   throw new Error(errorMsg.COMPLAINT_STATUS_EXISTS);
  // }

  // Find the largest existing complaintStatusId
  const maxComplaintStatusCount = await ComplaintStatusModel.findOne(
    {},
    { complaintStatusId: 1 },
    { sort: { complaintStatusId: -1 } }
  );

  // Calculate the next complaintStatusId
  const nextcomplaintStatusId = maxComplaintStatusCount
    ? maxComplaintStatusCount.complaintStatusId + 1
    : 1;

  const newComplaintStatusDetail = new ComplaintStatusModel({
    //Save in ComplaintStatus Model
    complaintStatusId: nextcomplaintStatusId,
    complaintStatusName,
    createdDate,
    updatedDate,
    isActive,
  });

  const newComplaintStatusDetails = await newComplaintStatusDetail.save();
  return newComplaintStatusDetails;
};

//Update ComplaintStatus
const updateComplaintStatus = async (
  complaintStatusId,
  updateComplaintStatusDetail
) => {
  // Check existing ComplaintStatus
  const complaintStatusData = await ComplaintStatusModel.findOne({
    complaintStatusId: complaintStatusId,
  });
  if (!complaintStatusData) {
    throw new Error(errorMsg.COMPLAINT_STATUS_NOT_FOUND);
  }

  const updatedComplaintStatus = await ComplaintStatusModel.findOneAndUpdate(
    { complaintStatusId: complaintStatusId },
    { $set: updateComplaintStatusDetail },
    { new: true }
  );
  if (!updatedComplaintStatus) {
    throw new Error(errorMsg.COMPALINT_STATUS_NOT_UPDATED);
  }
  return updatedComplaintStatus;
};

//Delete ComplaintStatus
const deleteComplaintStatus = async (
  complaintStatusId,
  deleteComplaintStatusDetail
) => {
  // Check Existing complaintStatusId
  const complaintStatusData = await ComplaintStatusModel.findOne({
    complaintStatusId: complaintStatusId,
  });

  if (!complaintStatusData) {
    throw new Error(errorMsg.COMPLAINT_STATUS_NOT_FOUND);
  }
  // update only if isActive is true
  const updateComplaintStatusData = await ComplaintStatusModel.findOneAndUpdate(
    { complaintStatusId: complaintStatusId },
    { $set: deleteComplaintStatusDetail },
    { new: true }
  );

  if (!updateComplaintStatusData) {
    throw new Error(errorMsg.COMPALINT_STATUS_NOT_UPDATED);
  }

  return updateComplaintStatusData;
};

module.exports = {
  createComplaintStatus,
  updateComplaintStatus,
  deleteComplaintStatus,
};
