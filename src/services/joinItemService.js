const JoinModel = require("../model/joinItemModel");

const registerJoin = async (joinDetails, fileName) => {
  const {
    // Field values from the UI
    afmxJoinId,
    afmxJoinDescription,
    afmxSlide,
    createdDate,
    updatedDate,
    isActive,
  } = joinDetails;

  // check existing id
  const existingJoin = await JoinModel.findOne({ afmxJoinId });

  if (existingJoin) {
    throw new Error("Join afmx exists");
  }

  // Fetch the count of banners
  const joinCount = await JoinModel.countDocuments();

  const joinNewDetails = new JoinModel({
    //Save in Join Model
    afmxJoinId: joinCount + 1,
    afmxJoinImageVideo: fileName,
    afmxJoinDescription,
    afmxSlide,
    createdDate,
    updatedDate,
    isActive,
  });

  const details = await joinNewDetails.save();
  return details;
};

const updateJoin = async (afmxJoinId, updatedJoinDetails) => {
  const joinData = await JoinModel.findOne({ afmxJoinId: afmxJoinId });

  //Check existing join data
  if (!joinData) {
    throw new Error("join data is not found");
  }

  const updateJoinAfmx = await JoinModel.findOneAndUpdate(
    { afmxJoinId },
    { $set: updatedJoinDetails },
    { new: true }
  );
  return updateJoinAfmx;
};

const getAllRegistersJoin = async () => {
  const joinData = await JoinModel.find({});

  if (!joinData) {
    throw new Error("Could not fetch data");
  }
  return joinData;
};

module.exports = {
  registerJoin,
  updateJoin,
  getAllRegistersJoin,
};
