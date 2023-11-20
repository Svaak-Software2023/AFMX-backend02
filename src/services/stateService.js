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

  // Check total Number of documents in the State collection
  let stateCount = 0;
  stateCount = await StateModel.find().count();

  // Validate the country based on Id
  if(countryId) {
    const countryRoleId = await countryModel.findOne({ countryId });
    console.log("countryId", countryRoleId);

    if(!countryRoleId) {
      throw new Error('Please select the valid country')
    }

  }
  const newStateDetails = await StateModel({
    //Save in State Model
    stateId: stateCount + 1,
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  });

  // Check Existing State
  const stateExists = await StateModel.findOne({ stateName });

  if (stateExists) {
    throw new Error("State exists");
  } else {
    const newDetails = await newStateDetails.save();
    return newDetails;
  }
};

// Get API's
const getAllRegistersState = async () => {

  const stateData = await StateModel.find({});
  if(!stateData) {
    throw new Error('Could not fetch data')
  }
  return stateData;
}

module.exports = {
  registerState,
  getAllRegistersState
};
