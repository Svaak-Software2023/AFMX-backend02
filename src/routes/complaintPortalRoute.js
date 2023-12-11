const express = require('express');
const complaint_portal_route = express.Router();

const complaint_portal_controller = require('../controller/complaintPortalController');

const fileAndDocUpload = require('../middleware/multer');

complaint_portal_route.post(
  "/add-complaint-portal",
  fileAndDocUpload.array('complaintRelatedDoc'),
  complaint_portal_controller.addComplaintPortal
);

module.exports = complaint_route;