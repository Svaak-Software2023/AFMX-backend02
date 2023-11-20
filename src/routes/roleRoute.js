const express = require('express');
const role_route = express.Router();


const role_controller = require('../controller/roleController.js');


role_route.post("/create-role", role_controller.createRole);

role_route.patch("/update-role/:roleId", role_controller.updateRole);

role_route.patch("/delete-role/:roleId", role_controller.deleteRole);

module.exports = role_route;