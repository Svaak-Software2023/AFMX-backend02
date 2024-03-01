const path = require("path");
const fs = require("fs");

const uploadToVSCode = async (uploadedFilePaths, targetDirectories) => {
  try {
    const uploadPaths = Array.isArray(uploadedFilePaths)
      ? uploadedFilePaths
      : [uploadedFilePaths]; // Convert single file path to an array

    const targetDirs = Array.isArray(targetDirectories)
      ? targetDirectories
      : [targetDirectories]; // Convert single directory path to an array

    if (uploadPaths.length !== targetDirs.length) {
      throw new Error("Number of files and target directories should match");
    }

    const movedFiles = [];

    for (let i = 0; i < uploadPaths.length; i++) {
      const uploadedFilePath = uploadPaths[i];
      const targetDirectory = targetDirs[i];

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
    throw new Error(`File upload failed: ${error.message}`);
  }
};

module.exports = uploadToVSCode;
