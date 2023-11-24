// const path = require("path");
// const fs = require("fs");

// const uploadToVSCode = async (uploadedFilePath, targetDirectory) => {
//   try {
//     // Check if the uploaded file path and target directory exist
//     if (!uploadedFilePath || !targetDirectory) {
//       throw new Error("Invalid file path or target directory");
//     }

//     const fileName = path.basename(uploadedFilePath);
//     const destinationPath = path.join(targetDirectory, fileName);

//     // Check if the target directory exists, create it if not
//     if (!fs.existsSync(targetDirectory)) {
//       fs.mkdirSync(targetDirectory, { recursive: true });
//     }

//     // Move the uploaded file to the target directory
//     fs.renameSync(uploadedFilePath, destinationPath);

//     return destinationPath; // Return the path where the file is moved
//   } catch (error) {
//     console.log("Error in file upload:", error.message);
//     throw new Error(`File upload failed: ${error.message}`);
//   }
// };

// module.exports = uploadToVSCode;

const path = require("path");
const fs = require("fs");

const uploadToVSCode = async (uploadedFilePaths, targetDirectories) => {
  try {
    if (
      !Array.isArray(uploadedFilePaths) ||
      !Array.isArray(targetDirectories)
    ) {
      throw new Error("Invalid input data");
    }

    if (uploadedFilePaths.length !== targetDirectories.length) {
      throw new Error("Number of files and target directories should match");
    }

    const movedFiles = [];

    for (let i = 0; i < uploadedFilePaths.length; i++) {
      const uploadedFilePath = uploadedFilePaths[i];
      const targetDirectory = targetDirectories[i];

      if (!uploadedFilePath || !targetDirectory) {
        throw new Error("Invalid file path or target directory");
      }

      const fileName = path.basename(uploadedFilePath);
      const destinationPath = path.join(targetDirectory, fileName);

      if (!fs.existsSync(targetDirectory)) {
        fs.mkdirSync(targetDirectory, { recursive: true });
      }

      fs.renameSync(uploadedFilePath, destinationPath);
      movedFiles.push(destinationPath);
    }

    return movedFiles; // Return an array of paths where the files are moved
  } catch (error) {
    // console.log("Error in file upload:", error.message);
    throw new Error(`File upload failed: ${error.message}`);
  }
};

module.exports = uploadToVSCode;
