const express = require("express");
const banner_route = express.Router();

const fileUploadMiddleware = require("../middleware/multer");

const banner_controller = require("../controller/bannerController");

banner_route.use(express.static("public"));
banner_route.post(
  "/banner-create",
  fileUploadMiddleware.single("bannerImage"),
  banner_controller.registerBanner
);

banner_route.put("/banner-update/:bannerId", banner_controller.updateBanner);

banner_route.put("/banner-delete/:bannerId", banner_controller.deleteBanner);

banner_route.get("/all-banner", banner_controller.getAllRegistersBanner);

module.exports = banner_route;
