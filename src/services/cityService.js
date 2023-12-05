const { errorMsg } = require("../const/errorHelper.js");
const CityModel = require("../model/cityModel.js");

const registerCity = async (cityDetails) => {
  const {
    //Field values from UI
    cityName,
    stateId,
    createdDate,
    updatedDate,
    isActive,
  } = cityDetails;

  // Check Existing City
  const cityExists = await CityModel.findOne({ cityName });

  if (cityExists) {
    throw new Error(errorMsg.CITY_EXISTS);
  }

  // Fetch count of city
  let cityCount = await CityModel.countDocuments();

  const newCityDetails = new CityModel({
    //Save in City Model
    cityId: cityCount + 1,
    cityName,
    stateId,
    createdDate,
    updatedDate,
    isActive,
  });

  const newDetails = await newCityDetails.save();
  return newDetails;
};

// Update method 
const updateCity = async (cityId, updateCityDetails) => {
  // Check existing country
  const cityData = await CityModel.findOne({ cityId });

  if (!cityData) {
    throw new Error(errorMsg.CITY_NOT_FOUND);
  }

  const updatedCity = await CityModel.findOneAndUpdate(
    { cityId: cityId },
    { $set: updateCityDetails },
    { new: true }
  );

  return updatedCity;
};


// Get method
const getAllRegistersCity = async () => {
  const cityData = await CityModel.find({});
  if (!cityData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return cityData;
};

module.exports = {
  registerCity,
  updateCity,
  getAllRegistersCity,
};
