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
  const countryExists = await CountryModel.findOne({ countryName });

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
  const countryData = await CountryModel.findOne({ countryId, isActive: true });

  if (!countryData) {
    throw new Error(errorMsg.COUNTRY_NOT_FOUND);
  }

  const updatedCountry = await CountryModel.findOneAndUpdate(
    { countryId: countryId },
    { $set: updateCountryDetails },
    { new: true }
  );

  if (!updatedCountry) {
    throw new Error(errorMsg.COUNTRY_NOT_FOUND);
  }

  return updatedCountry;
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
