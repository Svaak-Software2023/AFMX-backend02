const express = require('express');

const rXMemberShip_route = express.Router();

const rXMemberShip_controller = require('../controller/rXMembershipController');

const { verifyToken } = require('../middleware/auth');

rXMemberShip_route.post(
  '/subscription/create-membership-subscription',
  verifyToken,
  rXMemberShip_controller.createMembershipSubscription);

module.exports = rXMemberShip_route;