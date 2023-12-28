const clientService = require("../services/clientService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");
const { errorMsg, infoMsg, pathMsg } = require("../const/errorHelper");

const registerClient = async (req, res) => {
  try {
    const clientImagePath = req.file.path;

    // Handle the register client response.
    const signUpResponse = await clientService.registerClient(
      req.body,
      clientImagePath
    );

    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file.path;
    const targetDirectory = path.join(__dirname, pathMsg.CLIENT_IMAGES_PATH);

    await uploadToVSCode(uploadedFilePath, targetDirectory);

    return res
      .status(201)
      .json({ message: infoMsg.CLIENT_CREATION_SUCCESS, signUpResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded file
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({ error: error.message });
  }
};

const LoginClient = async (req, res) => {
  try {
    // Handle the login response.
    const signInResponse = await clientService.LoginClient(req.body);

    return res
      .status(200)
      .json({ message: infoMsg.LOGIN_SUCCESSFUL, signInResponse });
  } catch (error) {
    console.log("error: " + error.message);
    if (error.message === errorMsg.INVALID_PASSWORD) {
      return res
        .status(401)
        .json({ error: errorMsg.INVALID_CREDENTIALS_PASSWORD });
    } else {
      if (error.message === errorMsg.NOT_FOUND_USER) {
        return res.status(401).json({ error: errorMsg.UNAUTHORIZED_USER });
      }
    }

    return res.status(500).json({ error: error.message });
  }
};

const forgetPassword = async (req, res) => {
  try {
    // Handle the forget response.
    const forgetResponse = await clientService.forgetPassword(req.body);
    return res
      .status(200)
      .json({ message: infoMsg.RESET_LINK_SENT, forgetResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Handle the reset password response.
    const resetPasswordResponse = await clientService.resetPassword(
      req.body.userId,
      req.body.token,
      req.body.clientPassword
    );
    return res.json(resetPasswordResponse);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllRegistersClient = async (req, res) => {
  try {
    const getResponse = await clientService.getAllRegistersClient();
    return res.json({
      message: infoMsg.FETCH_CLIENT_SUCCESS,
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerClient,
  LoginClient,
  forgetPassword,
  resetPassword,
  getAllRegistersClient,
};
