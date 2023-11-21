const BannerModel = require("../model/bannerModel.js");
const clientModel = require("../model/clientModel.js");

const registerBanner = async (bannerDetails, filename) => {
  const {
    businessName,
    businessURL,
    countryName,
    countryCode,
    phoneNumber,
    bannerLocation,
    bannerImageTitle,
    bannerImageAltText,
    bannerImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  } = bannerDetails;

  // Check if the client exists
  const client = await clientModel.findOne({ clientId });

  if (!client) {
    throw new Error("Client with the provided ID does not exist");
  }

  if (!client.isActive) {
    throw new Error("Your clientId is not active, unable to create a banner");
  }

  // Fetch the count of banners
  const bannerCount = await BannerModel.countDocuments();

  // Creating banner model based on UI
  const newBannerDetails = new BannerModel({
    bannerId: bannerCount + 1,
    businessName,
    businessURL,
    countryName,
    countryCode,
    phoneNumber,
    bannerLocation,
    bannerImage: filename,
    bannerImageTitle,
    bannerImageAltText,
    bannerImageLink,
    startDate,
    endDate,
    description,
    clientId,
    isActive,
  });

  const bannerCreateDetails = await newBannerDetails.save();
  return bannerCreateDetails;

  // if (client.isActive) {
  //   // Creating banner model based on UI
  //   const newBannerDetails = new BannerModel({
  //     bannerId: bannerCount + 1,
  //     businessName,
  //     businessURL,
  //     countryName,
  //     countryCode,
  //     phoneNumber,
  //     bannerLocation,
  //     bannerImage: filename,
  //     bannerImageTitle,
  //     bannerImageAltText,
  //     bannerImageLink,
  //     startDate,
  //     endDate,
  //     description,
  //     clientId,
  //     isActive,
  //   });

  //   const bannerCreateDetails = await newBannerDetails.save();
  //   return bannerCreateDetails;
  // } else {
  //   throw new Error(
  //     "Your clientId does not exists, go to singup then create banner"
  //   );
  // }
};

const updateBanner = async (bannerId, updateDetails) => {
  // check existing bannerId
  const bannerData = await BannerModel.findOne({ bannerId: bannerId });

  if (!bannerData) {
    throw new Error("Banner data is not found");
  }

  // update only if isActive is true
  const updateData = await BannerModel.findOneAndUpdate(
    { bannerId: bannerId },
    { $set: updateDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error("Banner could not updated");
  }

  return updateData;
};

const deleteBanner = async (bannerId, deleteDetails) => {
  // check existing bannerId
  const bannerData = await BannerModel.findOne({ bannerId: bannerId });

  if (!bannerData) {
    throw new Error("Banner data is not found");
  }

  // update only if isActive is true
  const updateData = await BannerModel.findOneAndUpdate(
    { bannerId: bannerId },
    { $set: deleteDetails },
    { new: true }
  );
  if (!updateData) {
    throw new Error("Banner could not deactivate");
  }
  return updateData;
};

// Get API's
const getAllRegistersBanner = async () => {
  const userData = await BannerModel.find({});
  if (!userData) {
    throw new Error("Could not fetch users");
  }
  return userData;
};

module.exports = {
  registerBanner,
  updateBanner,
  deleteBanner,
  getAllRegistersBanner,
};
