const { errorMsg } = require("../const/errorHelper.js");
const AdvertiseModel = require("../model/advertiseModel.js");
const ClientModel = require("../model/clientModel.js");

const registerAdvertise = async (advertiseDetails, fileName) => {
  const {
    businessName,
    businessURL,
    phoneNumber,
    advertisePage,
    advertiseLocation,
    advertiseImageAltText,
    advertiseImageLink,
    startDate,
    endDate,
    updateDate,
    description,
    clientId,
    isActive,
  } = advertiseDetails;

  // Check if the client exists
  const client = await ClientModel.findOne({ clientId });

  if (!client) {
    throw new Error(errorMsg.CLIENT_NOT_FOUND);
  }

  if (!client.isActive) {
    throw new Error(errorMsg.INACTIVE_CLIENT_ADVERTIES_ERROR);
  }

  // Storing multiple image in arrImages
  const arrImages = fileName.map((file) => file.filename);

  // Find the largest existing advertiseId
  const maxAdverties = await AdvertiseModel.findOne(
    {},
    { advertiseId: 1 },
    { sort: { advertiseId: -1 } }
  );

  // Calculate the next advertiseId
  const nextAdvertiseId = maxAdverties ? maxAdverties.advertiseId + 1 : 1;

  // Determine the createdDate
  const createdDate = new Date(); // Default to current date

  // Convert startDate to Date object if it's a string
  const providedStartDate = new Date(startDate);

  // Check if startDate is provided and greater than or equal to createdDate
  let adjustedStartDate =
    startDate && providedStartDate >= createdDate
      ? providedStartDate
      : createdDate;

  // Creating banner model based on UI
  const newAdvertiseDetails = new AdvertiseModel({
    advertiseId: nextAdvertiseId,
    businessName,
    businessURL,
    advertisePage,
    phoneNumber,
    advertiseLocation,
    advertiseImage: arrImages,
    advertiseImageAltText,
    advertiseImageLink,
    startDate: adjustedStartDate,
    endDate,
    createdDate,
    updateDate,
    description,
    clientId,
    isActive,
  });

  const advertiseCreateDetails = await newAdvertiseDetails.save();
  return advertiseCreateDetails;
};

const updateAdvertise = async (advertiseId, updateDetails) => {
  // check existing bannerId
  const advertiseData = await AdvertiseModel.findOne({ advertiseId }).select(
    "-_id advertisePage advertiseLocation advertiseImageAltText isActive"
  );

  if (!advertiseData) {
    throw new Error(errorMsg.ADVERTIES_NOT_FOUND);
  }

  // update only if isActive is true
  const updateData = await AdvertiseModel.findOneAndUpdate(
    { advertiseId: advertiseId },
    { $set: updateDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error(errorMsg.ADVERTIES_NOT_UPDATED);
  }

  return updateData;
};

const deleteAdvertise = async (advertiseId, deleteDetails) => {
  // check existing bannerId
  const advertiseData = await AdvertiseModel.findOne({ advertiseId }).select(
    "-_id isActive"
  );

  if (!advertiseData) {
    throw new Error(errorMsg.ADVERTIES_NOT_FOUND);
  }

  // Check if there are more than one key in deleteDetails
  if (Object.keys(deleteDetails).length !== 1) {
    throw new Error(errorMsg.ONLY_ONE_PROPERTY_ALLOWED_ERROR);
  }

  // Ensure only active properties are allowed for deletion
  if (deleteDetails.isActive == null) {
    throw new Error(errorMsg.ONLY_ACTIVE_PROPERTIES_ALLOWED_ERROR);
  }

  // update only if isActive is true
  const updateData = await AdvertiseModel.findOneAndUpdate(
    { advertiseId: advertiseId },
    { $set: deleteDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error(errorMsg.ADVERTIES_NOT_UPDATED);
  }
  return updateData;
};

// Get API's
const getAllRegistersAdvertise = async () => {
  const userData = await AdvertiseModel.find({});
  if (!userData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return userData;
};

module.exports = {
  registerAdvertise,
  updateAdvertise,
  deleteAdvertise,
  getAllRegistersAdvertise,
};
