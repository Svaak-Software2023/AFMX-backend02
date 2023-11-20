const express = require("express");
const state_route = express.Router();

const state_controller = require("../controller/stateController.js");

state_route.post("/register-state", state_controller.registerState);

state_route.get("/all-state", state_controller.getAllRegistersState);

module.exports = state_route;
