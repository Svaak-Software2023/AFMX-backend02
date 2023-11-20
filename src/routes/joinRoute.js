const express = require("express");
const join_route = express.Router();

const join_controller = require("../controller/joinItemController.js");

const uploadImageAndVideo = require("../middleware/multer.js");

join_route.post(
  "/register-join",
  uploadImageAndVideo.single("afmxJoinImageVideo"),
  join_controller.registerJoin
);

join_route.put("/update-join/:afmxJoinId", join_controller.updateJoin);

join_route.get("/all-join", join_controller.getAllRegistersJoin);

module.exports = join_route;
