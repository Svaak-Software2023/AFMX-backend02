const { errorMsg } = require("../const/errorHelper.js");
const CountryModel = require("../model/countryModel.js");
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
    const countryRoleId = await CountryModel.findOne({ countryId, isActive: true });
    if (!countryRoleId) {
      throw new Error(errorMsg.VALID_COUNTRY);
    }
  }

  // Check Existing State
  const stateExists = await StateModel.findOne({ stateName: { $regex: new RegExp(`^${stateName}$`, 'i') } });

  if (stateExists) {
    throw new Error(errorMsg.STATE_EXISTS);
  }

  // Find the largest existing stateId
  const maxStateCount = await StateModel.findOne(
    {},
    { stateId: 1 },
    { sort: { stateId: -1 } }
  );

  // Calculate the next stateId
  const nextStateId = maxStateCount ? maxStateCount.stateId + 1 : 1;

  const newStateDetails = new StateModel({
    //Save in State Model
    stateId: nextStateId,
    stateName,
    countryId,
    createdDate,
    updatedDate,
    isActive,
  });

  const newDetails = await newStateDetails.save();
  return newDetails;
};


// Update Method
const updateState = async (stateId, updatedStateDetails) => {
  // Check existing country
  const stateData = await StateModel.findOne({ stateId });

  if (!stateData) {
    throw new Error(errorMsg.STATE_NOT_FOUND);
  }

  const dataToUpdate = await StateModel.findOneAndUpdate(
    { stateId: stateId },
    { $set: { isActive: updatedStateDetails.isActive } }, // Explicitly specify the field to update
    { 
      new: true,
      select: 'isActive' // Only allows the 'isActive' field to be returned in the updatedState
    }
  );

  return dataToUpdate;
};


// Get Method
const getAllRegistersState = async () => {
  const stateData = await StateModel.find({});
  if (!stateData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return stateData;
};

module.exports = {
  registerState,
  updateState,
  getAllRegistersState,
};
