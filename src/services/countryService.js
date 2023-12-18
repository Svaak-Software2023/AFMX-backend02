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
  } = countryDetails;

  // Check Existing Country
  const countryExists = await CountryModel.findOne({ countryName: { $regex: new RegExp(`^${countryName}$`, 'i') } });
  console.log("countryExists", countryExists);
  if (countryExists) {
    throw new Error(errorMsg.COUNTRY_EXISTS);
  }

  // Check total Number of documents in the Country collection
  let countryCount = await CountryModel.countDocuments();

  const newCountryDetails = await CountryModel({
    //Save in Country Model
    countryId: countryCount + 1,
    countryName,
    countryShortName,
    countryPhoneCode,
    createdDate,
    updatedDate,
    isActive,
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
