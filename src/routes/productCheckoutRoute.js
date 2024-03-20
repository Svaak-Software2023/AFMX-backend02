const express = require('express');
const productCheckout_route = express.Router();

const productCheckout_controller = require('../controller/productCheckoutController');

const { verifyToken } = require('../middleware/auth');

productCheckout_route.post(
  "/checkout/create-checkout/:cartId",
  verifyToken,
  productCheckout_controller.createProductCheckout);


module.exports = productCheckout_route;
  