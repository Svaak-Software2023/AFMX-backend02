const joinService = require("../services/joinItemService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const registerJoin = async (req, res) => {
  try {
    const joinResponse = await joinService.registerJoin(
      req.body,
      req.file.filename
    );

    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file.path;
    const targetDirectory = path.join(__dirname, "../public/joinImages");

    await uploadToVSCode(uploadedFilePath, targetDirectory);

    return res.status(201).json({ message: "Join Created", joinResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    return res.status(500).json({ error: error.message });
  }
};

const updateJoin = async (req, res) => {
  try {
    const updateResponse = await joinService.updateJoin(
      req.params.afmxJoinId,
      req.body
    );
    if (updateResponse) {
      return res
        .status(200)
        .json({ message: "Updated Successfully", updateResponse });
    } else {
      return res.status(404).json({ message: "Not Updated", updateResponse });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRegistersJoin = async (req, res) => {
  try {
    const getResponse = await joinService.getAllRegistersJoin();
    return res.json({
      message: "Fetch all Join register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerJoin,
  updateJoin,
  getAllRegistersJoin,
};
