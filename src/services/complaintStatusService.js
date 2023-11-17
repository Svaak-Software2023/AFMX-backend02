const complaintStatusModel = require("../model/complaintStatusModel.js");

//Create ComplaintStatus
const createComplaintStatus = async (complaintStatusDetail) => {
  const {
    //Field values from UI
    complaintStatusName,
    createdDate,
    updatedDate,
    isActive,
  } = complaintStatusDetail;

  // Check total Number of documents(records) in the complaintStatus collection(table)
  let complaintStatusCount = 0;
  complaintStatusCount = await complaintStatusModel.find().count();

  const newComplaintStatusDetail = await complaintStatusModel({
    //Save in ComplaintStatus Model
    complaintStatusId: complaintStatusCount + 1,
    complaintStatusName,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing ComplaintStatus
  const complaintStatusExists = await complaintStatusModel.findOne({
    complaintStatusName,
  });

  if (complaintStatusExists) {
    throw new Error("Complaint Status exists");
  } else {
    const newComplaintStatusDetails = await newComplaintStatusDetail.save();
    return newComplaintStatusDetails;
  }
};

//Update ComplaintStatus
const updateComplaintStatus = async (
  complaintStatusId,
  updateComplaintStatusDetail
) => {
  // Check existing ComplaintStatus
  const complaintStatusData = await complaintStatusModel.findOne({
    complaintStatusId: complaintStatusId,
  });
  if (!complaintStatusData) {
    throw new Error("Complaint Status not found.");
  }

  const updatedComplaintStatus =
    await complaintStatusModel.findOneAndUpdate(
      { complaintStatusId: complaintStatusId },
      { $set: updateComplaintStatusDetail },
      { new: true }
    );
  if (!updatedComplaintStatus) {
    throw new Error("Complaint Status could not updated");
  }
  return updatedComplaintStatus;
};

//Delete ComplaintStatus
const deleteComplaintStatus = async (
  complaintStatusId,
  deleteComplaintStatusDetail
) => {
  // Check Existing complaintStatusId
  const complaintStatusData = await complaintStatusModel.findOne({
    complaintStatusId: complaintStatusId,
  });

  if (!complaintStatusData) {
    throw new Error("Complaint Status not found.");
  }
  // update only if isActive is true
  const updateComplaintStatusData =
    await complaintStatusModel.findOneAndUpdate(
      { complaintStatusId: complaintStatusId },
      { $set: deleteComplaintStatusDetail },
      { new: true }
    );

  if (!updateComplaintStatusData) {
    throw new Error("Complaint Status could not de-activate");
  }

  return updateComplaintStatusData;
};

module.exports = {
  createComplaintStatus,
  updateComplaintStatus,
  deleteComplaintStatus,
};
