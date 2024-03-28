const express = require('express');

const rXMemberShip_route = express.Router();

const rXMemberShip_controller = require('../controller/rXMembershipController');

const { verifyToken } = require('../middleware/auth');

// Route for creating membership subscription
rXMemberShip_route.post(
  '/subscription/create-membership-subscription',
  verifyToken,
  rXMemberShip_controller.createMembershipSubscription);

// Route for handling success URL from Stripe and updating payment status
rXMemberShip_route.get(
  '/payment/success',
  rXMemberShip_controller.handleSuccessUrl
);

  rXMemberShip_route.get(
    '/subscription/get-membership-subscription',
    verifyToken,
    rXMemberShip_controller.getMembershipSubscription);

module.exports = rXMemberShip_route;