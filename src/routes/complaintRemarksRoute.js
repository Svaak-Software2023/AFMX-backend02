const express = require("express");
const complaint_remarks_route = express.Router();

const complaint_remarks_controller = require("../controller/complaintRemarksController.js");

complaint_remarks_route.post(
  "/create-complaint-remarks",
  complaint_remarks_controller.createComplaintRemarks
);

module.exports = complaint_remarks_route;