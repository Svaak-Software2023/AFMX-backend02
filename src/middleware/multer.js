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
const destinationPathJoinImage = path.join(__dirname, "../public/joinImages");
const destinationPathProductImage = path.join(__dirname, "../public/productImages");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let destinationPath;

    // check the fieldname to determine the destination path
    if (file.fieldname === "clientProfileImage") {
      destinationPath = destinationPathClientImage;
    } else if (file.fieldname === "advertiseImage") {
      destinationPath = destinationPathbannerImage;
    } else if (file.fieldname === "afmxJoinImageVideo") {
      destinationPath = destinationPathJoinImage;
    } else if (file.fieldname === "productImage") {
      destinationPath = destinationPathProductImage;
    }

    if (destinationPath) {
      cb(null, destinationPath);
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50000000,
  },
});

module.exports = upload;
