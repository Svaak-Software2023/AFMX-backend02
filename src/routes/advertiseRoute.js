const express = require("express");
const advertise_route = express.Router();

advertise_route.use(express.static("public"));

// Passing the json incoming request
advertise_route.use(express.json());
advertise_route.use(express.urlencoded({ extended:true }));

const fileUploadMiddleware = require("../middleware/multer");

const advertise_controller = require("../controller/advertiseController");

advertise_route.use(express.static("public"));
advertise_route.post(
  "/advertise-create",
  fileUploadMiddleware.array("advertiseImage"),
  advertise_controller.registerAdvertise 
);

advertise_route.put("/advertise-update/:advertiseId", advertise_controller.updateAdvertise);

advertise_route.patch("/advertise-delete/:advertiseId", advertise_controller.deleteAdvertise);

advertise_route.get("/all-advertise", advertise_controller.getAllRegistersAdvertise);

module.exports = advertise_route;
