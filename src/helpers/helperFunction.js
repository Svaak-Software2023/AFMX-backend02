const stripe = require("stripe")(
  "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
);

// Import the Cloudinary image upload helper
const cludinaryImageUpload = require("../helpers/cludinaryImageUpload");

//  Resume Validation Methods
function validateResume(resume) {
  // Get the file extension from the resume
  const fileExtension = resume.split(".").pop().toLowerCase();

  // Check if the file extension is allowed
  const allowedExtensions = ["doc", "docx", "pdf", "txt", "rtf"];
  return allowedExtensions.includes(fileExtension);
}

// Email validation Methods
function validateEmail(email) {
  // Regular expression for basic email validation
  const emailRegex = /^\S+@\S+\.\S{2,}$/;
  return emailRegex.test(email);
}

const updatePaymentStatus = async (sessionId) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    console.log("session", session);
  } catch (error) {
    console.log("error", error);
    throw new Error("Failed to retrieve the session", error.message);
  }
};

/******** Replace existing image or images from the cloudinary as well as database **********/
const replaceExistingImages = async (productImageUrl, productImagePath) => {
  try {

    // Extracting public id, media name, and extension
    const extractPublicIds =
      cludinaryImageUpload.getPublicIdFromCloudinaryUrl(productImageUrl);

    const extractMediaNames = extractPublicIds.map(
      (extractPublicId) => extractPublicId.split(".")[0]
    );
    const extractExtensions = extractPublicIds.map(
      (extractPublicId) => extractPublicId.split(".")[1]
    );

    for (let i = 0; i < extractPublicIds.length; i++) {
      // Delete existing media from Cloudinary
      const deletedMediaOnCloudinary =
        await cludinaryImageUpload.imageDeleteInCloudinary(
          extractMediaNames[i]
        );

      // Validating deletion
      if (!deletedMediaOnCloudinary || deletedMediaOnCloudinary.length === 0) {
        throw new Error(
          `Media ${extractExtensions[i]} deletion failed on Cloudinary`
        );
      }
    }

    // Upload product images to Cloudinary
    const uploadProductImage =
      await cludinaryImageUpload.fileUploadInCloudinary(
        productImagePath,
        "productImages"
      );
    const arrImages = uploadProductImage.map((image) => image.url);
    return arrImages;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  validateEmail,
  validateResume,
  updatePaymentStatus,
  replaceExistingImages,
};
