const MiniTvModel = require("../model/miniTvModel");

// Import the Cloudinary image upload helper
const cloudinaryImageUpload = require("../helpers/cludinaryImageUpload");

const createMiniTv = async (miniDetails, miniTvMediaPath) => {
  const {
    //Field values from UI
    mediaUrl,
  } = miniDetails;

  if (!miniTvMediaPath) {
    throw new Error("Media is required");
  }

  const uploadedMedia = await cloudinaryImageUpload.fileUploadInCloudinary(
    miniTvMediaPath,
    "miniTvMedia"
  );
  if (!uploadedMedia || uploadedMedia.length === 0) {
    throw new Error(
      "Media upload failed or uploading media File size too large"
    );
  }

  // Find the largest existing miniTvId
  const maxMiniTvCount = await MiniTvModel.findOne(
    {},
    { miniTvId: 1 },
    { sort: { miniTvId: -1 } }
  );

  // Calculate the next miniTvId
  const nextMiniTvId = maxMiniTvCount ? maxMiniTvCount.miniTvId + 1 : 1;

  const newMiniTv = new MiniTvModel({
    miniTvId: nextMiniTvId,
    miniTvMedia: uploadedMedia[0].url,
    mediaUrl,
  });

  // Record Mini Tv Media Save on the database
  const savedMiniTv = await newMiniTv.save();
  console.log("Mini Tv Media Saved", savedMiniTv);
  return savedMiniTv;
};

const deleteMiniTv = async (bodyData, paramsData) => {
  const { miniTvId } = paramsData;

  const { isActive } = bodyData;

  const updatedMiniTv = await MiniTvModel.findOneAndUpdate(
    { miniTvId: miniTvId },
    {
      $set: {
        isActive,
        updatedDate: new Date(),
      },
    },
    {
      new: true,
      upsert: false,
    }
  );

  if (!updatedMiniTv) {
    throw new Error("Cannot delete miniTv or it does not exist");
  }

  return updatedMiniTv;
};

const getAllAndSingleMiniTv = async (bodyData) => {
  const { miniTvId } = bodyData;

  let miniTv;
  if (miniTvId) {
    miniTv = await MiniTvModel.findOne({
      miniTvId: miniTvId,
      isActive: true,
    });
    if (!miniTv) {
      throw new Error(`Neither Mini Tv exists nor isActive`);
    }
  } else {
    miniTv = await MiniTvModel.find({ isActive: true });
    if (!miniTv || miniTv.length === 0) {
      throw new Error(`Neither Mini Tv exists nor isActive`);
    }
  }
  return miniTv;
};

module.exports = {
  createMiniTv,
  deleteMiniTv,
  getAllAndSingleMiniTv,
};
