const AdminModel = require("../model/superAdminModel");
const bycrptjs = require("bcryptjs");

const bycrptSalt = process.env.BCRYPT_SALT;

// Secure the password
const securePassword = async(password) => {
    try {
        const bycrptPassword = await bycrptjs.hash(password, Number(bycrptSalt));
        return bycrptPassword
    } catch (error) {
        return error.message;
    }
}
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
    throw new Error("Admin Exists");
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
      throw new Error("Password does not match");
    }
  } else {
    throw new Error("Login details are not valid");
  }
};

// change password method
const changePassowrd = async(adminDetails) => {

    const { adminId, adminPassword } = adminDetails;

    if(!adminId || !adminPassword) {
        throw new Error('Id or Password field is missing')
    }

        const newPassword = await securePassword(adminPassword);
        console.log("newPassword", newPassword);

       const updatedAdmin =  await AdminModel.findOneAndUpdate(
         { adminId }, //  Finding based on adminId field
         { adminPassword: newPassword },
         { new: true} // Return the updated document
        );
        console.log("updateData", updatedAdmin);

        if (!updatedAdmin) {
            throw new Error('Admin ID not found');
          }
       
        return updatedAdmin;

}

module.exports = {
  loginAdmin,
  changePassowrd
};
