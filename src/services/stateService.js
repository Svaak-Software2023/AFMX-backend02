const countryModel = require("../model/countryModel.js");
const StateModel = require("../model/stateModel.js");

const registerState = async (stateDetails) => {
  const {
    //Field values from UI
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  } = stateDetails;

  // Validate the country based on Id
  if (countryId) {
    const countryRoleId = await countryModel.findOne({ countryId });
    if (!countryRoleId) {
      throw new Error("Please select the valid country");
    }
  }

  // Check Existing State
  const stateExists = await StateModel.findOne({ stateName });

  if (stateExists) {
    throw new Error("State already exists");
  }

  // Check total Number of documents in the State collection
  let stateCount = await StateModel.countDocuments();

  const newStateDetails = new StateModel({
    //Save in State Model
    stateId: stateCount + 1,
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  });

  const newDetails = await newStateDetails.save();
  return newDetails;
};

// Get API's
const getAllRegistersState = async () => {
  const stateData = await StateModel.find({});
  if (!stateData) {
    throw new Error("Could not fetch data");
  }
  return stateData;
};

module.exports = {
  registerState,
  getAllRegistersState,
};
