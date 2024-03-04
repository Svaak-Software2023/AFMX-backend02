const { fileUploadInCloudinary } = require("../helpers/cludinaryImageUpload");
const { validateEmail, validateResume } = require("../helpers/helperFunction");
const CareerAndEmploymentModel = require("../model/careerAndEmploymentModel");
const { errorMsg } = require("../const/errorHelper");
const { fields } = require("../middleware/multer");

const createtFormForCareer = async (careerDetails, resumePdfPath) => {
  const {
    //Field values from UI
    firstName,
    lastName,
    email,
    phone,
    educationData,
    experienceData,
    summary,
    coverLatter,
    eligibleForEmployment,
    employedByCityWide,
  } = careerDetails;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !eligibleForEmployment ||
    !employedByCityWide
  ) {
    throw new Error(`Missing required field`);
  }

  if (
    [
      firstName,
      lastName,
      email,
      phone,
      eligibleForEmployment,
      employedByCityWide,
    ].some((field) => field?.trim() === "")
  ) {
    throw new Error(`Missing required value`);
  }
  // perform validation on the email field
  if (!validateEmail(email)) {
    throw new Error(`${email} is not a valid email`);
  }

  const existingUsers = await CareerAndEmploymentModel.findOne({
    email: email,
  });

  if (existingUsers) {
    throw new Error(errorMsg.EMAIL_ALREADY_EXISTS);
  }

  // Parse educationData and experienceData from JSON strings to objects
  let educationObject = {};
  let experienceObject = {};

  // Parse educationData if defined and not empty
  if (educationData) {
    educationObject = JSON.parse(educationData);
  }

  // Parse experienceData if defined and not empty
  if (experienceData) {
    experienceObject = JSON.parse(experienceData);
  }

  // Check if resume is not empty
  if (!resumePdfPath) {
    throw new Error("Please provide a resume");
  }

  // perform validation on the resume field
  if (!validateResume(resumePdfPath)) {
    throw new Error(
      `Invalid resume file type. Only .doc, .docx, .pdf, .txt, .rtf are allowed.`
    );
  }
  // Uploading the pdf on cloudinary server
  const uploadedResumePdf = await fileUploadInCloudinary(
    resumePdfPath,
    "resumePdf"
  );

  // Find the largest existing careerAndEmploymentId
  const maxCareerAndEmploymentCount = await CareerAndEmploymentModel.findOne(
    {},
    { careerAndEmploymentId: 1 },
    { sort: { careerAndEmploymentId: -1 } }
  );

  // Calculate the next careerAndEmploymentId
  const nextCareerAndEmploymentId = maxCareerAndEmploymentCount
    ? maxCareerAndEmploymentCount.careerAndEmploymentId + 1
    : 1;

  const createCareerForm = new CareerAndEmploymentModel({
    careerAndEmploymentId: nextCareerAndEmploymentId,
    firstName,
    lastName,
    email,
    phone,
    education: educationObject,
    experience: experienceObject,
    summary,
    resume: uploadedResumePdf[0].url,
    coverLatter,
    eligibleForEmployment,
    employedByCityWide,
  });

  const careerToSave = await createCareerForm.save();
  return careerToSave;
};

module.exports = {
  createtFormForCareer,
};
