const AdminModel = require("../model/superAdminModel");
const bycrptjs = require("bcryptjs");

const { errorMsg } = require("../const/errorHelper")

const { securePassword } = require("../utility/passwordUtils");

// const createAdmin = async (adminDetails) => {

//     const { adminPassword, adminEmail } = adminDetails;

//     const sPassword = await securePassword(adminPassword);
//     console.log("password", sPassword);

//     const newAdmin = await AdminModel({
//         adminEmail,
//         adminPassword: sPassword
//     });

//      const adminData = await newAdmin.save();
//      return adminData;
// }

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
      const updateDetails = {
        adminEmail: adminData.adminEmail,
        adminPassword: adminData.adminPassword,
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
  }

  return updatedAdmin;
};

module.exports = {
  loginAdmin,
  changePassowrd,
};
