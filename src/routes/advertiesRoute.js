const express = require("express");
const adverties_route = express.Router();

adverties_route.use(express.static("public"));

// Passing the json incoming request
adverties_route.use(express.json());
adverties_route.use(express.urlencoded({ extended:true }));

const fileUploadMiddleware = require("../middleware/multer");

const adverties_controller = require("../controller/advertiesController");

adverties_route.use(express.static("public"));
adverties_route.post(
  "/adverties-create",
  fileUploadMiddleware.array("advertiesImage"),
  adverties_controller.registerAdverties 
);

adverties_route.put("/adverties-update/:advertiesId", adverties_controller.updateAdverties);

adverties_route.patch("/adverties-delete/:advertiesId", adverties_controller.deleteAdverties);

adverties_route.get("/all-adverties", adverties_controller.getAllRegistersAdverties);

module.exports = adverties_route;
