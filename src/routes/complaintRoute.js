const express = require('express');
const complaint_route = express.Router();

const complaint_controller = require('../controller/complaintController.js');

const fileAndDocUpload = require('../middleware/multer.js');


complaint_route.post(
  "/create-complaint",
  fileAndDocUpload.single("complaintDoc"),
  complaint_controller.createComplaintPortal
);

module.exports = complaint_route;