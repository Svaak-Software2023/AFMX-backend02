const { errorMsg } = require("../const/errorHelper.js");
const CityModel = require("../model/cityModel.js");
const StateModel = require("../model/stateModel.js");

const registerCity = async (cityDetails) => {
  const {
    //Field values from UI
    cityName,
    isCity,
    stateId,
    createdDate,
    updatedDate,
    isActive,
  } = cityDetails;

  // Check Existing City
  const cityExists = await CityModel.findOne({ cityName: { $regex: new RegExp(`^${cityName}$`, 'i') } });

  if (cityExists) {
    throw new Error(errorMsg.CITY_EXISTS);
  }

  const stateIds = await StateModel.findOne({ stateId , isActive: true});
  if (!stateIds) {
    throw new Error("Neither state exists nor active");
  }

  // Fetch count of city
  let cityCount = await CityModel.countDocuments();

  const newCityDetails = new CityModel({
    //Save in City Model
    cityId: cityCount + 1,
    cityName,
    isCity,
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
    throw new Error("City does not exist");
  }

  const updatedCity = await CityModel.findOneAndUpdate(
    { cityId: cityId },
    { $set: { isActive: updateCityDetails.isActive } }, // Explicitly specify the field to update
    { 
      new: true,
      select: 'isActive' // Only allows the 'isActive' field to be returned in the updatedCity
    }
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
