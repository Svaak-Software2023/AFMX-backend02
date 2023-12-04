const { errorMsg } = require("../const/errorHelper.js");
const AdvertiseModel = require("../model/advertiseModel.js");
const clientModel = require("../model/clientModel.js");

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
    description,
    clientId,
    isActive,
  } = advertiseDetails;

  // Check if the client exists
  const client = await clientModel.findOne({ clientId });

  if (!client) {
    throw new Error(errorMsg.CLIENT_NOT_FOUND);
  }

  if (!client.isActive) {
    throw new Error(errorMsg.INACTIVE_CLIENT_ADVERTIES_ERROR);
  }


  // Storing multiple image in arrImages   
  const arrImages = [];
  for (let i = 0; i < fileName.length; i++) {
    arrImages[i] = fileName[i].filename;
  }

  // Fetch the count of banners
  const advertiseCount = await AdvertiseModel.countDocuments();

  // Creating banner model based on UI
  const newAdvertiseDetails = new AdvertiseModel({
    advertiseId: advertiseCount + 1,
    businessName,
    businessURL,
    advertisePage,
    phoneNumber,
    advertiseLocation,
    advertiseImage: arrImages,
    advertiseImageAltText,
    advertiseImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  });

  const advertiseCreateDetails = await newAdvertiseDetails.save();
  return advertiseCreateDetails;
};

const updateAdvertise = async (advertiseId, updateDetails) => {

  console.log("updateDetails", updateDetails);

  // check existing bannerId
  const advertiseData = await AdvertiseModel.findOne({ advertiseId })
  .select("-_id advertisePage advertiseLocation advertiseImageAltText isActive");
  console.log("advertises", advertiseData);

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
  const advertiseData = await AdvertiseModel.findOne({ advertiseId }).select("-_id isActive");

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
