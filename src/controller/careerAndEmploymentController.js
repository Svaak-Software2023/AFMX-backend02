const careerService = require("../services/careerAndEmploymentService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");
const { pathMsg } = require("../const/errorHelper");

const createtFormForCareer = async (req, res) => {
  try {
    const resumePdfPath = req.file?.path;
    console.log("This is the request",resumePdfPath);
    const careerFormResponse = await careerService.createtFormForCareer(
      req.body,
      resumePdfPath
    );

    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file?.path;
    const targetDirectory = path.join(__dirname, pathMsg.RESUME_PDF_PATH);

    await uploadToVSCode(uploadedFilePath, targetDirectory);
    return res
      .status(201)
      .json({ message: "Career Form Created", careerFormResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createtFormForCareer,
};
