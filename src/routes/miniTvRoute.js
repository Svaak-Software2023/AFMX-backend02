const express = require('express');
const miniTv_route = express.Router();

const uploadMiniTvMedia = require('../middleware/multer');
const miniTv_controller = require('../controller/miniTvController');


miniTv_route.post(
  "/mini-tv/upload-media",
  uploadMiniTvMedia.single('miniTvMedia'),
  miniTv_controller.createMiniTv
); 

miniTv_route.patch(
  "/mini-tv/updateAndDelete-media",
  miniTv_controller.deleteAndUpdateMiniTv
);

miniTv_route.patch(
  "/mini-tv/updated-miniVideo",
  uploadMiniTvMedia.single('miniTvMedia'),
  miniTv_controller.deleteAndUpdateMiniMedia
);

miniTv_route.get(
  "/mini-tv/get-media",
  miniTv_controller.getAllAndSingleMiniTv
);

miniTv_route.delete("/mini-tv/delete-media", miniTv_controller.deleteSingleMiniTv);

module.exports = miniTv_route;

