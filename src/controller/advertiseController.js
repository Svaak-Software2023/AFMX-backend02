const advertiseService = require("../services/advertiseService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const registerAdvertise = async (req, res) => {
  try {
    // Call registerBanner function and await its response
    const advertiseResponse = await advertiseService.registerAdvertise(
      req.body,
      req.files
    );

    // After API execution succeeds, perform the file upload, Assuming req.files is an array of files
    const uploadedFiles = req.files.map((file) => file.path);
    const targetDirectories = Array(req.files.length).fill(
      path.join(__dirname, "../public/advertiseImages")
    );

    await uploadToVSCode(uploadedFiles, targetDirectories);

    return res.json({ message: "Advertise created", advertiseResponse });
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

const updateAdvertise = async (req, res) => {
  try {
    // Handle the update banner response
    const advertiseUpdateResponse = await advertiseService.updateAdvertise(
      req.params.advertiseId,
      req.body
    );
    return res.json({ message: "Advertise Update", advertiseUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteAdvertise = async (req, res) => {
  try {
    // Handle the delete banner response based on bannerId
    const advertiseDeleteResponse = await advertiseService.deleteAdvertise(
      req.params.advertiseId,
      req.body
    );
    return res.json({ message: "Advertise deactivated", advertiseDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRegistersAdvertise = async (req, res) => {
  try {
    const getResponse = await advertiseService.getAllRegistersAdvertise();
    return res.json({
      message: "Fetch all Advertise register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerAdvertise,
  updateAdvertise,
  deleteAdvertise,
  getAllRegistersAdvertise,
};
