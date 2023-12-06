const express = require("express");
const service_department_route = express.Router();

const service_department_controller = require("../controller/serviceDepartmentController");

service_department_route.post(
  "/create-service-department",
  service_department_controller.createServiceDepartment
);

service_department_route.put(
  "/update-service-deparment/:serviceDepartmentId",
  service_department_controller.updateServiceDepartment
);

service_department_route.get(
  "/single-service-department",
  service_department_controller.getSingleCreateServiceDepartment
);

service_department_route.get(
  "/all-service-department",
  service_department_controller.getAllCreateServiceDepartment
);

module.exports = service_department_route;
