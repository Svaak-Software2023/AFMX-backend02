const express = require("express");
const city_route = express.Router();

const city_controller = require("../controller/cityController.js");

city_route.post("/register-city", city_controller.registerCity);

city_route.put(
    "/update-city/:cityId",
    city_controller.updateCity
  );

city_route.get("/all-city", city_controller.getAllRegistersCity);

module.exports = city_route;
