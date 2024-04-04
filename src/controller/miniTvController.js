const miniTvService = require("../services/miniTvService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");
const { pathMsg } = require("../const/errorHelper");


const createMiniTv = async (req, res) => {
  try {
    const miniTvMediaPath = req.file?.path;

    // Handle the miniTv Response from the server
    const miniTvResponse = await miniTvService.createMiniTv(
      req.body,
      miniTvMediaPath
    );
    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file.path;
    const targetDirectory = path.join(__dirname, pathMsg.MINI_TV_PATH);

    await uploadToVSCode(uploadedFilePath, targetDirectory);

    return res.status(201).json({ message: "Mini Tv created", miniTvResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: error.message });
  }
};


const deleteAndUpdateMiniTv = async (req, res) => {
  try {
    // Handle The Mini Tv Response.
    const miniTvDeleteResponse = await miniTvService.deleteAndUpdateMiniTv(
      req.body
    );
    return res.json({ message: " Mini Tv Deleted !", miniTvDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllAndSingleMiniTv = async (req, res) => {
  try {
    // Handle The Mini Tv Response.
    const miniTvGetSingleResponse = await miniTvService.getAllAndSingleMiniTv(
      req.body
    );
    return res.json({ message: " Mini Tv Fetched !", miniTvGetSingleResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMiniTv,
  deleteAndUpdateMiniTv,
  getAllAndSingleMiniTv
};
