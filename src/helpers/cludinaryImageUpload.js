const cloudinary = require("cloudinary").v2;
const fs = require("fs");
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

// Function to upload multiple images
const fileUploadInCloudinary = async (filePath, folderName) => {
  if (!filePath) return null;

  const uploadedImages = [];

  if (!Array.isArray(filePath)) {
    filePath = [filePath]; // Convert to an array if it's not already
  }

  for (const file of filePath) {
    try {
      const uploadResult = await cloudinary.uploader.upload(file, {
        folder: folderName, // Specify the folder,
        resource_type: "auto",
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
      fs.unlinkSync(filePath); //remove the locally saved temp file as the upload operation got failed
      return null;
    }
  }

  return uploadedImages;
};

// Function to delete the video and images from the cloudinary
const videoDeleteInCloudinary = async (publicIds, resource_type = "video") => {
  if (!publicIds) return null;
  const deletedImages = [];

  if (!Array.isArray(publicIds)) {
    publicIds = [publicIds]; // Convert to an array if it's not already
  }

  for (const publicId of publicIds) {
    try {
      const deletionResponse = await cloudinary.uploader.destroy(publicId, {
        resource_type: resource_type,
      });
      // Check if the deletion was successful
      if (deletionResponse.result === "ok") {
        // Save the uploaded image details (URL, public ID, etc.)
        deletedImages.push({
          publicId: publicId,
          resourceType: resource_type, // Add resource type to the deleted media details
          // Add more details as needed
        });
      } else {
        console.error(`Error deleting videos: ${deletionResponse.result}`);
      }
    } catch (error) {
      // Handle errors during upload
      console.error(`Error deletion: ${error.message}`);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
  return deletedImages;
};

// Function to delete the video and images from the cloudinary
const imageDeleteInCloudinary = async (publicIds, resource_type = "image") => {
  if (!publicIds) return null;
  const deletedImages = [];

  if (!Array.isArray(publicIds)) {
    publicIds = [publicIds]; // Convert to an array if it's not already
  }

  for (const publicId of publicIds) {
    try {
      const deletionResponse = await cloudinary.uploader.destroy(publicId, {
        resource_type: resource_type,
      });
      // Check if the deletion was successful
      if (deletionResponse.result === "ok") {
        // Save the uploaded image details (URL, public ID, etc.)
        deletedImages.push({
          publicId: publicId,
          resourceType: resource_type, // Add resource type to the deleted media details
          // Add more details as needed
        });
      } else {
        console.error(`Error deleting image : ${deletionResponse.result}`);
      }
    } catch (error) {
      // Handle errors during upload
      console.error(`Error deletion image: ${error.message}`);
      throw error; // Rethrow the error to handle it in the calling function
    }
  }
  return deletedImages;
};

// Function to extract public ID from Cloudinary URL
const getPublicIdFromCloudinaryUrl = (url) => {
  // const publicId = url.split("/").pop().split('.')[0];
  // return publicId;

  // Check if the url is an array
  if (Array.isArray(url)) {
    // If it's an array, process each URL and extract public IDs
    return url.map((singleUrl) => {
      const pathSegments = singleUrl.split("/"); // Split the URL by '/'
      const desiredPath = pathSegments.slice(-2).join("/"); // Get the last two segments and join them with '/'
      return desiredPath;
    });
  } else {
    // If it's a single URL, extract public ID directly
    const pathSegments = url.split("/"); // Split the URL by '/'
    const desiredPath = pathSegments.slice(-2).join("/"); // Get the last two segments and join them with '/'
    return desiredPath;
  }
};

module.exports = {
  fileUploadInCloudinary,
  videoDeleteInCloudinary,
  imageDeleteInCloudinary,
  getPublicIdFromCloudinaryUrl,
};
