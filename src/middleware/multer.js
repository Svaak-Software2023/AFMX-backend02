const multer = require("multer");
const path = require("path");

const destinationPathClientImage = path.join(
  __dirname,
  "../public/clientImages"
);
const destinationPathbannerImage = path.join(
  __dirname,
  "../public/advertiseImages"
);
const destinationPathServicesImage = path.join(
  __dirname,
  "../public/servicesImages"
);
const destinationPathEvidencePicture = path.join(
  __dirname,
  "../public/evidencePictures"
);
const destinationPathEvidenceVideo = path.join(
  __dirname,
  "../public/evidenceVideos"
);
const destinationPathProductImage = path.join(__dirname, "../public/productImages");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath;

    // check the fieldname to determine the destination path
    if (file.fieldname === "clientProfileImage") {
      destinationPath = destinationPathClientImage;
    } else if (file.fieldname === "advertiseImage") {
      destinationPath = destinationPathbannerImage;
    } else if (file.fieldname === "productImage") {
      destinationPath = destinationPathProductImage;
    } else if (file.fieldname === "serviceImage") {
      destinationPath = destinationPathServicesImage;
    } else if (file.fieldname === "evidencePicture") {
      destinationPath = destinationPathEvidencePicture;
    } else if(file.fieldname === "evidenceVideo") {
      destinationPath = destinationPathEvidenceVideo;
    }

    if (destinationPath) {
      cb(null, destinationPath);
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (req, file, cb) {
    const name =  file.originalname;
    console.log("name: ", name);
    cb(null, name);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000, // File size limit (50MB in bytes)
  },
});

module.exports = upload;
