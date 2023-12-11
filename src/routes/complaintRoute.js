const express = require('express');
const complaint_route = express.Router();

const complaint_controller = require('../controller/complaintController.js');

complaint_route.post(
  "/create-complaint",
  complaint_controller.createComplaintPortal
);

module.exports = complaint_route;