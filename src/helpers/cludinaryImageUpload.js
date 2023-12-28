const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Function to upload multiple images
const fileUploadInCloudinary = async (filePath, folderName) => {
  const uploadedImages = [];

  if (!Array.isArray(filePath)) {
    filePath = [filePath]; // Convert to an array if it's not already
    console.log("filePath: ", filePath);
  }

  for (const file of filePath) {
    try {
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: folderName, // Specify the folder
      });

      // Save the uploaded image details (URL, public ID, etc.)
      uploadedImages.push({
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        // Add more details as needed
      });
    } catch (error) {
      // Handle errors during upload
      console.error(`Error uploading image: ${error.message}`);
    }
  }

  return uploadedImages;
};

module.exports = {
  fileUploadInCloudinary,
};
