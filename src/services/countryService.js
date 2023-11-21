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
    throw new Error("Country exists");
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
  const countryData = await CountryModel.findOne({ countryId: countryId });

  if (!countryData) {
    throw new Error("country data not found");
  }

  const updatedCountry = await CountryModel.findOneAndUpdate(
    { countryId: countryId },
    { $set: updateCountryDetails },
    { new: true }
  );

  if (!updatedCountry) {
    throw new Error("Country not found");
  }

  return updatedCountry;
};

// Get API's
const getAllRegistersCountry = async () => {
  const countryData = await CountryModel.find({});
  if (!countryData) {
    throw new Error("Could not fetch data");
  }
  return countryData;
};

module.exports = {
  registerCountry,
  updateCountry,
  getAllRegistersCountry,
};
