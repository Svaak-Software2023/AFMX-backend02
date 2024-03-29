const express = require('express');

const whislist_route = express.Router();

const whislist_controller = require('../controller/whislistController');
const { verifyToken } = require('../middleware/auth');

whislist_route.post(
  '/whislists/add-whislists',
  verifyToken, 
  whislist_controller.addToWhislist
); 


whislist_route.get(
  '/whislists/get-whislists',
  verifyToken, 
  whislist_controller.getAllWhislist
)

module.exports = whislist_route;