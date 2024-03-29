const { errorMsg } = require("../const/errorHelper.js");
const complaintCategoryModel = require("../model/complaintCategoryModel.js");

//Create ComplaintCategory
const createComplaintCategory = async (complaintCategoryDetails) => {
  const {
    //Field values from UI
    complaintCategoryName,
    createdDate,
    updatedDate,
    isActive,
  } = complaintCategoryDetails;

  // Find the largest existing complaintCategoryId
  const maxComplaintCategoryCount = await complaintCategoryModel.findOne(
    {},
    { complaintCategoryId: 1 },
    { sort: { complaintCategoryId: -1 } }
  );

  // Calculate the next complaintCategoryId
  const nextComplaintCategoryId = maxComplaintCategoryCount
    ? maxComplaintCategoryCount.complaintCategoryId + 1
    : 1;

  const newComplaintCategoryDetails = await complaintCategoryModel({
    //Save in ComplaintCategory Model
    complaintCategoryId: nextComplaintCategoryId,
    complaintCategoryName,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing ComplaintCategory
  const complaintCategoryExists = await complaintCategoryModel.findOne({
    complaintCategoryName,
  });

  if (complaintCategoryExists) {
    throw new Error(errorMsg.COMPLAINT_EXISTS);
  } else {
    const complaintCategoryData = await newComplaintCategoryDetails.save();
    return complaintCategoryData;
  }
};

//Update ComplaintCategory
const updateComplaintCategory = async (
  complaintCategoryId,
  updateComplaintCategoryDetails
) => {
  // Check existing ComplaintCategory
  const complaintCategoryData = await complaintCategoryModel.findOne({
    complaintCategoryId: complaintCategoryId,
  });
  if (!complaintCategoryData) {
    throw new Error(errorMsg.COMPLAINT_NOT_FOUND);
  }

  const updatedComplaintCategory =
    await complaintCategoryModel.findOneAndUpdate(
      { complaintCategoryId: complaintCategoryId },
      { $set: updateComplaintCategoryDetails },
      { new: true }
    );
  if (!updatedComplaintCategory) {
    throw new Error(errorMsg.COMPLAINT_NOT_UPDATED);
  }
  return updatedComplaintCategory;
};

//Delete ComplaintCategory
const deleteComplaintCategory = async (
  complaintCategoryId,
  deleteComplaintCategoryDetails
) => {
  // Check Existing complaintCategoryId
  const complaintCategoryData = await complaintCategoryModel.findOne({
    complaintCategoryId: complaintCategoryId,
  });

  if (!complaintCategoryData) {
    throw new Error(errorMsg.COMPLAINT_NOT_FOUND);
  }
  // update only if isActive is true
  const updateComplaintCategoryData =
    await complaintCategoryModel.findOneAndUpdate(
      { complaintCategoryId: complaintCategoryId },
      { $set: deleteComplaintCategoryDetails },
      { new: true }
    );

  if (!updateComplaintCategoryData) {
    throw new Error(errorMsg.COMPLAINT_NOT_UPDATED);
  }

  return updateComplaintCategoryData;
};

// Get Method
const getAllComplaintCategory = async () => {
  const complaintCategoryData = await complaintCategoryModel.find({});
  if (!complaintCategoryData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return complaintCategoryData;
};

module.exports = {
  createComplaintCategory,
  updateComplaintCategory,
  deleteComplaintCategory,
  getAllComplaintCategory,
};
