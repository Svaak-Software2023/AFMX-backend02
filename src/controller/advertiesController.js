const advertiesService = require("../services/advertiesService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const registerAdverties = async (req, res) => {
  try {
    // Call registerBanner function and await its response
    const advertiesResponse = await advertiesService.registerAdverties(
      req.body,
      req.files
    );

    // After API execution succeeds, perform the file upload, Assuming req.files is an array of files
    const uploadedFiles = req.files.map((file) => file.path);
    const targetDirectories = Array(req.files.length).fill(
      path.join(__dirname, "../public/advertiesImages")
    );

    await uploadToVSCode(uploadedFiles, targetDirectories);

    return res.json({ message: "Adverties created", advertiesResponse });
  } catch (error) {
    console.log("error1", error.message);

     // If an error occurs, delete the uploaded files
     if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }
    return res.status(500).json({ error: error.message });
  }
};

const updateAdverties = async (req, res) => {
  try {
    // Handle the update banner response
    const advertiesUpdateResponse = await advertiesService.updateAdverties(
      req.params.advertiesId,
      req.body
    );
    return res.json({ message: "Adverties Update", advertiesUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteAdverties = async (req, res) => {
  try {
    // Handle the delete banner response based on bannerId
    const advertiesDeleteResponse = await advertiesService.deleteAdverties(
      req.params.advertiesId,
      req.body
    );
    return res.json({ message: "Adverties deactivated", advertiesDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRegistersAdverties = async (req, res) => {
  try {
    const getResponse = await advertiesService.getAllRegistersAdverties();
    return res.json({
      message: "Fetch all Adverties register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerAdverties,
  updateAdverties,
  deleteAdverties,
  getAllRegistersAdverties,
};
