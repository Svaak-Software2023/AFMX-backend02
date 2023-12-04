const AdminModel = require("../model/superAdminModel");
const bycrptjs = require("bcryptjs");

const { errorMsg, infoMsg } = require("../const/errorHelper");

const { securePassword } = require("../utility/passwordUtils");
const { generateToken } = require("../utility/tokenValidateUtils");

// login admin api
const loginAdmin = async (adminDetails) => {
  const { adminEmail, adminPassword } = adminDetails;

  const adminData = await AdminModel.findOne({ adminEmail });

  if (!adminData) {
    throw new Error(errorMsg.ADMIN_EXISTS);
  }

  if (adminData) {
    const passwordMatch = await bycrptjs.compare(
      adminPassword,
      adminData.adminPassword
    );

    if (passwordMatch) {
      const tokenData = await generateToken(adminData.adminId);
      const updateDetails = {
        adminId: adminData.adminId,
        adminName: adminData.adminName,
        adminEmail: adminData.adminEmail,
        adminPassword: adminData.adminPassword,
        token: tokenData,
      };
      return updateDetails;
    } else {
      throw new Error(errorMsg.INVAID_PASSWORD);
    }
  } else {
    throw new Error(errorMsg.INVALID_LOGIN);
  }
};

// change password method
const changePassowrd = async (adminDetails) => {
  const { adminId, adminPassword } = adminDetails;

  if (!adminId || !adminPassword) {
    throw new Error(errorMsg.ID_AND_PASSWORD_MISSING);
  }

  const newPassword = await securePassword(adminPassword);

  const updatedAdmin = await AdminModel.findOneAndUpdate(
    { adminId }, //  Finding based on adminId field
    { adminPassword: newPassword },
    { new: true } // Return the updated document
  );

  if (!updatedAdmin) {
    throw new Error(errorMsg.ADMIN_NOT_FOUND);
    throw new Error(infoMsg.ADMIN_LOGIN_SUCCESS)
  }

  return updatedAdmin;
};

module.exports = {
  loginAdmin,
  changePassowrd,
};
