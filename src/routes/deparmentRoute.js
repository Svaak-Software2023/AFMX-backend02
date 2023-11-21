const express = require("express");
const deparment_route = express.Router();

const deparment_controller = require("../controller/departmentController");

deparment_route.post(
  "/register-deparment",
  deparment_controller.registerDeparment
);

deparment_route.put(
  "/update-deparment/:departmentId",
  deparment_controller.updateDepartment
);

deparment_route.get(
  "/single-department",
  deparment_controller.getSingleRegistersDepartment
);

deparment_route.get(
  "/all-department",
  deparment_controller.getAllRegistersDepartment
);

module.exports = deparment_route;
