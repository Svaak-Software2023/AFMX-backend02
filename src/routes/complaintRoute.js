const express = require('express');
const complaint_route = express.Router();

const complaint_controller = require('../controller/complaintController.js');

const fileAndDocUpload = require('../middleware/multer.js');

complaint_route.post(
  "/create-exist-complaint",
  fileAndDocUpload.fields([
    { name: 'evidencePicture', maxCount: 1 },
    { name: 'evidenceVideo', maxCount: 1 }
  ]),
  complaint_controller.existingComplaintPortal
);

complaint_route.post(
  "/create-nonExist-complaint",
  fileAndDocUpload.fields([
    { name: 'evidencePicture', maxCount: 1 },
    { name: 'evidenceVideo', maxCount: 1 }
  ]),
  complaint_controller.nonExistingComplaintPortal
);

complaint_route.get('/all-complaint-portal/:complaineeId', complaint_controller.getAllCreateComplaintPortalService);

module.exports = complaint_route;