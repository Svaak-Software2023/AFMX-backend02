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
  "/mini-tv/delete-media/:miniTvId",
  miniTv_controller.deleteMiniTv
);


miniTv_route.get(
  "/mini-tv/get-media",
  miniTv_controller.getAllAndSingleMiniTv
);

module.exports = miniTv_route;

