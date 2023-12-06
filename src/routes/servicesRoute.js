const express = require("express");
const services_route = express.Router();

services_route.use(express.static("public"));

// Passing the json incoming request
services_route.use(express.json());
services_route.use(express.urlencoded({ extended: true }));

const filesUpload = require('../middleware/multer');

const services_controller = require('../controller/servicesController');

services_route.post('/create-service', filesUpload.array("serviceImage"), services_controller.createService);

services_route.put('/update-service', services_controller.updateService);

services_route.patch('/delete-service/:serviceId', services_controller.deleteService);

services_route.get('/all-services', services_controller.getAllCreateService);

module.exports = services_route;
