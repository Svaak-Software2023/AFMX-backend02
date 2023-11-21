const express = require("express");
const complaintStatus_controller = require("../controller/complaintStatusController.js");

const complaintStatus_route = express.Router();

complaintStatus_route.post(
  "/create-complaintStatus",
  complaintStatus_controller.createComplaintStatus
);

complaintStatus_route.put(
  "/update-complaintStatus/:complaintStatusId",
  complaintStatus_controller.updateComplaintStatus
);

complaintStatus_route.put(
  "/delete-complaintStatus/:complaintStatusId",
  complaintStatus_controller.deleteComplaintStatus
);

module.exports = complaintStatus_route;
