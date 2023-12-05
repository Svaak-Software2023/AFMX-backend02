require("dotenv").config();
const sendEmail = require("../utility/sendEmail.js");
const bycrptjs = require("bcryptjs");
const crypto = require("crypto");
const ClientModel = require("../model/clientModel.js");
const TokenModel = require("../model/tokenModel.js");
const RoleModel = require("../model/roleModel.js");
const CountryModel = require("../model/countryModel.js");
const StateModel = require("../model/stateModel.js");

const { securePassword } = require("../utility/passwordUtils.js");
const { generateToken } = require("../utility/tokenUtils.js");


// Import the email content object from the specified file for email content access
const {
  emailContentInfo,
  forgetPassContentInfo,
  resetPassContentInfo,
} = require("../const/emailContent.js");

// Importing error messages from the error helper module
const { errorMsg, infoMsg } = require("../const/errorHelper.js");

// Fetch client url from environment variables
const client_url = process.env.CLIENT_URL;

/**
 *
 * @param {New client information} signUpDetails
 * @param {Client prefence image } filename
 * @returns New client created object
 */

const registerClient = async (signUpDetails, filename) => {
  const hashedPassword = await securePassword(signUpDetails.clientPassword);

  const {
    roleName,
    clientPrifix,
    clientFirstName,
    clientMiddleName,
    clientLastName,
    clientSuffix,
    clientSSN,
    clientAddress1,
    clientAddress2,
    clientPostalCode,
    clientCity,
    stateId,
    countryId,
    clientPhone,
    clientEmail,
    clientLinkedInProfile,
    clientWebsite,
    createdDate,
    updatedDate,
    isActive,
  } = signUpDetails;

  // finding the roleId from the roleModel
  const role = await RoleModel.findOne({ roleName });

  // Check role exists and if isActive is not true
  if (!role || !role.isActive) {
    throw new Error(errorMsg.INVALID_ACTIVE);
  }

  // Finding the country based on the name
  if (countryId) {
    const countryRoleId = await CountryModel.findOne({ countryId });
    if (!countryRoleId) {
      throw new Error(errorMsg.VALID_COUNTRY);
    }
  }

  // Validate the state based on the Id
  if (stateId) {
    const stateRoleId = await StateModel.findOne({ stateId });
    if (!stateRoleId) {
      throw new Error(errorMsg.VALID_STATE);
    }
  }
  // Fetch the count of client
  const clientCount = await ClientModel.countDocuments();

  const newClientDetails = new ClientModel({
    clientId: clientCount + 1,
    roleId: role.roleId,
    clientPrifix,
    clientFirstName,
    clientMiddleName,
    clientLastName,
    clientSuffix,
    clientProfileImage: filename,
    clientSSN,
    clientAddress1,
    clientAddress2,
    clientPostalCode,
    clientCity,
    stateId,
    countryId,
    clientPassword: hashedPassword,
    clientPhone,
    clientEmail,
    clientLinkedInProfile,
    clientWebsite,
    createdDate,
    updatedDate,
    isActive,
  });

  // cheking exitsting user
  const existingUser = await ClientModel.findOne({ clientEmail });

  if (existingUser) {
    throw new Error(errorMsg.EMAIL_ALREADY_EXISTS);
  }

  const clientDetails = await newClientDetails.save();

  // Prepare the data to send an email to users.
  const subject = emailContentInfo.WELCOME_RESPONSE_SUBJECT;
  const middleName = clientMiddleName ? ` ${clientMiddleName},` : ",";
  const emailContent = `<p>Dear ${clientFirstName} ${middleName}</p> ${emailContentInfo.WELCOME_RESPONSE_CONTENT}`;

  //Sending the email to client Users.
  sendEmail(clientEmail, subject, emailContent);

  return clientDetails;
};

/**
 *
 * @param {Login client credentials information} loginDetails
 * @returns Logged in client object
 */

const LoginClient = async (loginDetails) => {
  const { clientEmail, clientPassword } = loginDetails;

  if (!clientEmail || !clientPassword) {
    throw new Error(errorMsg.REQUIRED_CLIENT_CREDENTIALS);
  }

  const user = await ClientModel.findOne({ clientEmail });

  if (!user) {
    // User not found, handle this case
    throw new Error(errorMsg.NOT_FOUND_USER);
  }

  // validate, user is active or not
  // only active user is allowed to login
  if (!user.isActive) {
    throw new Error(errorMsg.NOT_ACTIVE_USER);
  }

  if (user) {
    const passwordMatch = await bycrptjs.compare(
      clientPassword,
      user.clientPassword
    );

    if (passwordMatch) {
      const tokenData = await generateToken(user.clientId);

      const userDetails = {
        clientId: user.clientId,
        clientPrifix: user.clientPrifix,
        clientFirstName: user.clientFirstName,
        clientMiddleName: user.clientMiddleName,
        clientLastName: user.clientLastName,
        clientSuffix: user.clientSuffix,
        clientProfileImage: user.clientProfileImage,
        clientSSN: user.clientSSN,
        clientAddress1: user.clientAddress1,
        clientAddress2: user.clientAddress2,
        clientPostalCode: user.clientPostalCode,
        clientCity: user.clientCity,
        stateId: user.stateId,
        countryId: user.countryId,
        clientPassword: user.clientPassword,
        clientPhone: user.clientPhone,
        clientEmail: user.clientEmail,
        clientLinkedInProfile: user.clientLinkedInProfile,
        clientWebsite: user.clientWebsite,
        isActive: user.isActive,
        token: tokenData,
      };
      return userDetails;
    } else {
      throw new Error(errorMsg.INVAID_PASSWORD);
    }
  } else {
    throw new Error(errorMsg.INVALID_LOGIN);
  }
};

/**
 *
 * @param {Forget client credentials information} forgetDetails
 * @returns Send the link to the client to reset the password
 */

const forgetPassword = async (forgetDetails) => {
  const { clientEmail } = forgetDetails;

  const user = await ClientModel.findOne({ clientEmail: clientEmail });

  if (!user) throw new Error(errorMsg.EMAIL_NOT_FOUND);

  let token = await TokenModel.findOne({ userId: user._id });
  let randomBytesString = crypto.randomBytes(32).toString("hex");
  let hashToken = await securePassword(randomBytesString);
  if (token) await token.deleteOne();

  await new TokenModel({
    userId: user._id,
    token: hashToken,
    createdAt: Date.now(),
  }).save();

  const subject = forgetPassContentInfo.FORGET_PASSWORD_SUBJECT;

  const resetContentAndLink = `
  <p>Dear ${user.clientFirstName} ${user.clientMiddleName},</p>
  ${forgetPassContentInfo.FORGET_PASSWORD_CONTENT_ONE}
  <a href="${client_url}/api/reset-password?&token=${randomBytesString}&id=${user._id}">${infoMsg.PASSWORD_RESET_LINK}</a>. 
  ${forgetPassContentInfo.FORGET_PASSWORD_CONTENT_TWO}
  `;

  // Sending email to the client for reset password.
  sendEmail(clientEmail, subject, resetContentAndLink);
  return { resetContentAndLink };
};

/**
 * 
 * @param {*Take the obejctId } userId 
 * @param {*Take the token} token 
 * @param {* client password to bycrpt it } clientPassword 
 * @returns 
 */

const resetPassword = async (userId, token, clientPassword) => {
  let passwordResetToken = await TokenModel.findOne({ userId });

  if (!passwordResetToken) {
    throw new Error(errorMsg.INVALID_OR_EXPIRED_TOKEN);
  }
  const isValid = await bycrptjs.compare(token, passwordResetToken.token);

  if (!isValid) {
    throw new Error(errorMsg.INVALID_OR_EXPIRED_TOKEN);
  }
  const newPassword = await securePassword(clientPassword);

  await ClientModel.findByIdAndUpdate(
    { _id: userId },
    { $set: { clientPassword: newPassword } },
    { new: true }
  );

  const user = await ClientModel.findById({ _id: userId });

  const subject = resetPassContentInfo.RESET_PASSWORD_SUCCESS_SUBJECT;

  const resetSuccssContentAndLink = `
  <p>Dear ${user.clientFirstName} ${user.clientMiddleName},</p>
  ${resetPassContentInfo.RESET_PASSWORD_SUCCESS_CONTENT}
  `;

  // Sending an email to the client reset password.
  sendEmail(user.clientEmail, subject, resetSuccssContentAndLink);

  await passwordResetToken.deleteOne();

  return { message: infoMsg.PASSWORD_RESET_SUCCESS };
};
/**
 * 
 * @returns All the client data
 */
const getAllRegistersClient = async () => {
  const clientData = await ClientModel.find({});

  if (clientData.length === 0) {
  throw new Error(errorMsg.FETCH_USERS_FAILED);
}
  return clientData;
};

module.exports = {
  registerClient,
  LoginClient,
  forgetPassword,
  resetPassword,
  getAllRegistersClient,
};
