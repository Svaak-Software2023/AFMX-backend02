const { errorMsg } = require("../const/errorHelper.js");
const AdvertiesModel = require("../model/advertiesModel.js");
const clientModel = require("../model/clientModel.js");

const registerAdverties = async (advertiesDetails, fileName) => {
  const {
    businessName,
    businessURL,
    phoneNumber,
    advertiesPage,
    advertiesLocation,
    advertiesImageAltText,
    advertiesImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  } = advertiesDetails;

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
  const advertiesCount = await AdvertiesModel.countDocuments();

  // Creating banner model based on UI
  const newAdvertiesDetails = new AdvertiesModel({
    advertiesId: advertiesCount + 1,
    businessName,
    businessURL,
    advertiesPage,
    phoneNumber,
    advertiesLocation,
    advertiesImage: arrImages,
    advertiesImageAltText,
    advertiesImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  });

  const advertiesCreateDetails = await newAdvertiesDetails.save();
  return advertiesCreateDetails;
};

const updateAdverties = async (advertiesId, updateDetails) => {

console.log("updateDetails", updateDetails);

  // check existing bannerId
  const advertiesData = await AdvertiesModel.findOne({ advertiesId });
  console.log("advertises", advertiesData);

  if (!advertiesData) {
    throw new Error(errorMsg.ADVERTIES_NOT_FOUND);
  }

  // update only if isActive is true
  const updateData = await AdvertiesModel.findOneAndUpdate(
    { advertiesId: advertiesId },
    { $set: updateDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error(errorMsg.ADVERTIES_NOT_UPDATED);
  }

  return updateData;
};

const deleteAdverties = async (advertiesId, deleteDetails) => {
  // check existing bannerId
  const advertiesData = await AdvertiesModel.findOne({ advertiesId }).select("-_id isActive");

  if (!advertiesData) {
    throw new Error(errorMsg.ADVERTIES_NOT_FOUND);
  }

  // Check if there are more than one key in deleteDetails
if (Object.keys(deleteDetails).length !== 1) {
  throw new Error(errorMsg.ONLY_ONE_PROPERTY_ALLOWED_ERROR);
}

if(deleteDetails.isActive == null) {
  throw new Error(errorMsg.ONLY_ACTIVE_PROPERTIES_ALLOWED_ERROR);
}

  // update only if isActive is true
  const updateData = await AdvertiesModel.findOneAndUpdate(
    { advertiesId: advertiesId },
    { $set: deleteDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error(errorMsg.ADVERTIES_NOT_UPDATED);
  }
  return updateData;
};

// Get API's
const getAllRegistersAdverties = async () => {
  const userData = await AdvertiesModel.find({});
  if (!userData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return userData;
};

module.exports = {
  registerAdverties,
  updateAdverties,
  deleteAdverties,
  getAllRegistersAdverties,
};
