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


const deleteAndUpdateMiniTv = async (bodyData) => {
  const { isActive, miniTvId, mediaUrl } = bodyData;

  let updatedMiniTv;
  if (isActive !== undefined) {
    if (!miniTvId) {
      throw new Error("Mini Tv Id is required");
    }
    updatedMiniTv = await MiniTvModel.findOneAndUpdate(
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
  } else {
    if (!miniTvId || !mediaUrl) {
      throw new Error("Mini Tv Id and Media Url are required");
    }
    updatedMiniTv = await MiniTvModel.findOneAndUpdate(
      { miniTvId: miniTvId },
      {
        $set: {
          mediaUrl,
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
  }
  return updatedMiniTv;
};


const deleteAndUpdateMiniMedia = async (bodyData, miniTvMediaPath) => {
  const { miniTvId } = bodyData;

  if (!miniTvId) {
    throw new Error("Mini Tv Id is required");
  }

  const existingMiniTv = await MiniTvModel.findOne({
    miniTvId: miniTvId,
    isActive: true,
  }).select("-_id");

  if (!existingMiniTv) {
    throw new Error("Mini Tv does not exist");
  }
  if (!miniTvMediaPath) {
    throw new Error("miniMediaTv is missing");
  }
  try {
    const extractPublicId = cloudinaryImageUpload.getPublicIdFromCloudinaryUrl(
      existingMiniTv.miniTvMedia
    );

    // Delete existing media from Cloudinary
    const deletedOnCloudinary =
      await cloudinaryImageUpload.fileDeleteInCloudinary(extractPublicId);

    // Upload new media to Cloudinary
    const uploadToCloudinary =
      await cloudinaryImageUpload.fileUploadInCloudinary(
        miniTvMediaPath,
        "miniTvMedia"
      );

    if (deletedOnCloudinary.length === 0 || uploadToCloudinary.length === 0) {
      throw new Error(
        "Media deletion or upload failed, or uploaded media file size too large"
      );
    }

    // Update MiniTvModel with new media URL
    const updatedMiniTvMedia = await MiniTvModel.findOneAndUpdate(
      { miniTvId: miniTvId },
      {
        $set: {
          miniTvMedia: uploadToCloudinary[0].url,
          updatedDate: new Date(),
        },
      },
      {
        new: true,
        upsert: false,
      }
    );

    if (!updatedMiniTvMedia) {
      throw new Error("Cannot update miniTv or it does not exist");
    }

    return updatedMiniTvMedia;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
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
    miniTv = await MiniTvModel.find({});
    if (!miniTv || miniTv.length === 0) {
      throw new Error(`Neither Mini Tv exists nor isActive`);
    }
  }
  return miniTv;
};


const deleteSingleMiniTv = async (queryParams) => {
  const { miniTvId } = queryParams;

  // Check if the MiniTv exists
  const miniTv = await MiniTvModel.findOneAndDelete({ miniTvId: miniTvId });
  console.log("Mini Tv deleted", miniTv);

  // If MiniTv does not exist, throw an error
  if (!miniTv) {
      throw new Error("Mini Tv does not exist");
  }

  // Extract the public ID from the Cloudinary URL
  const extractPublicId = cloudinaryImageUpload.getPublicIdFromCloudinaryUrl(miniTv.miniTvMedia);

  // Delete the media from Cloudinary
  const deletedOnCloudinary = await cloudinaryImageUpload.fileDeleteInCloudinary(extractPublicId);

  // If media deletion failed, throw an error
  if (deletedOnCloudinary.length === 0) {
      throw new Error("Media deletion failed");
  }

  return miniTv;
};


module.exports = {
  createMiniTv,
  deleteAndUpdateMiniTv,
  deleteAndUpdateMiniMedia,
  getAllAndSingleMiniTv,
  deleteSingleMiniTv
};
