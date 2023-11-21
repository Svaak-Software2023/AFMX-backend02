const bannerService = require("../services/bannerService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const registerBanner = async (req, res) => {
  try {
    // Call registerBanner function and await its response
    const bannerResponse = await bannerService.registerBanner(
      req.body,
      req.file.filename
    );

    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file.path;
    const targetDirectory = path.join(__dirname, "../public/bannerImages");

    await uploadToVSCode(uploadedFilePath, targetDirectory);

    return res.json({ message: "Banner created", bannerResponse });
  } catch (error) {
    console.log("error1", error.message);

    // If an error occurs, delete the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ error: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    // Handle the update banner response
    const bannerUpdateResponse = await bannerService.updateBanner(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner Update", bannerUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    // Handle the delete banner response based on bannerId
    const bannerDeleteResponse = await bannerService.deleteBanner(
      req.params.bannerId,
      req.body
    );
    return res.json({ message: "Banner deactivated", bannerDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRegistersBanner = async (req, res) => {
  try {
    const getResponse = await bannerService.getAllRegistersBanner();
    return res.json({
      message: "Fetch all Banner register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerBanner,
  updateBanner,
  deleteBanner,
  getAllRegistersBanner,
};
