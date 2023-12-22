const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});


const fileUploadInCloudinary = async (filePath, folderName) => {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName,
        });
        console.log("result: " , result);
        return result;
        
    } catch (error) {
        console.log(error.message);
        
    }
}

module.exports = {
    fileUploadInCloudinary
}