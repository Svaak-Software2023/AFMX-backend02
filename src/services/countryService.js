const { errorMsg } = require("../const/errorHelper.js");
const CountryModel = require("../model/countryModel.js");

const registerCountry = async (countryDetails) => {
  const {
    //Field values from UI
    countryName,
    countryShortName,
    countryPhoneCode,
    createdDate,
    updatedDate,
    isActive,
    latLng,
    isFlag
  } = countryDetails;

  // Check Existing Country
  const countryExists = await CountryModel.findOne({ countryName: { $regex: new RegExp(`^${countryName}$`, 'i') } });
  console.log("countryExists", countryExists);
  if (countryExists) {
    throw new Error(errorMsg.COUNTRY_EXISTS);
  }

  // Find the largest existing countryId
  const maxCountryCount = await CountryModel.findOne(
    {},
    { countryId: 1 },
    { sort: { countryId: -1 } }
  );

  // Calculate the next countryId
  const nextCountryId = maxCountryCount
    ? maxCountryCount.countryId + 1
    : 1;

  const newCountryDetails = await CountryModel({
    //Save in Country Model
    countryId: nextCountryId,
    countryName,
    countryShortName,
    countryPhoneCode,
    createdDate,
    updatedDate,
    isActive,
    latLng
  });

  const newDetails = await newCountryDetails.save();
  return newDetails;
};

//Update Country

const updateCountry = async (countryId, updateCountryDetails) => {
  // Check existing country
  const countryData = await CountryModel.findOne({ countryId });

  if (!countryData) {
    throw new Error(errorMsg.COUNTRY_NOT_FOUND);
  }

  const dataToUpdate = await CountryModel.findOneAndUpdate(
    { countryId: countryId },
    { $set: { isActive: updateCountryDetails.isActive } }, // Explicitly specify the field to update
    { 
      new: true,
      select: 'isActive' // Only allows the 'isActive' field to be returned in the updatedCountry 
    }
  );

  if (!dataToUpdate) {
    throw new Error(errorMsg.COUNTRY_NOT_UPDATED);
  }

  return dataToUpdate;
};

// Get API's
const getAllRegistersCountry = async () => {
  const countryData = await CountryModel.find({});
  if (!countryData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return countryData;
};

module.exports = {
  registerCountry,
  updateCountry,
  getAllRegistersCountry,
};
