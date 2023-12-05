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

  // Check total Number of documents(records) in the complaintCategory collection(table)
  let complaintCategoryCount = 0;
  complaintCategoryCount = await complaintCategoryModel.find().count();

  const newComplaintCategoryDetails = await complaintCategoryModel({
    //Save in ComplaintCategory Model
    complaintCategoryId: complaintCategoryCount + 1,
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

module.exports = {
  createComplaintCategory,
  updateComplaintCategory,
  deleteComplaintCategory,
};
