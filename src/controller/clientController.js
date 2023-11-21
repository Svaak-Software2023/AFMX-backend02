const clientService = require("../services/clientService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const registerClient = async (req, res) => {
  try {
    // Handle the register client response.
    const signUpResponse = await clientService.registerClient(
      req.body,
      req.file.filename
    );

    // After API execution succeeds, perform the file upload
    const uploadedFilePath = req.file.path;
    const targetDirectory = path.join(__dirname, "../public/clientImages");

    await uploadToVSCode(uploadedFilePath, targetDirectory);

    return res
      .status(201)
      .json({ message: "Client Created Successfully", signUpResponse });
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
      .json({ message: "Login Succefully", signInResponse });
  } catch (error) {
    if (error.message === "Password does not match") {
      return res.status(401).json({ error: "Invalid Credentials Password" });
    } else {
      if (error.message === "User not found") {
        return res.status(401).json({ error: "Unauthorized User" });
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
      .json({ message: "Link has been sent in your email", forgetResponse });
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
      message: "Fetch all client register details successfully ",
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
