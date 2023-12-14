const express = require("express");
const complaintCategory_route = express.Router();

const complaintCategory_controller = require("../controller/complaintCategoryController.js");

complaintCategory_route.post(
  "/create-complaintCategory",
  complaintCategory_controller.createComplaintCategory
);

complaintCategory_route.put(
  "/update-complaintCategory/:complaintCategoryId",
  complaintCategory_controller.updateComplaintCategory
);

complaintCategory_route.put(
  "/delete-complaintCategory/:complaintCategoryId",
  complaintCategory_controller.deleteComplaintCategory
);

complaintCategory_route.get("/all-category", complaintCategory_controller.getAllComplaintCategory);

module.exports = complaintCategory_route;
