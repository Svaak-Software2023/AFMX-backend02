const express = require('express');
const cartItem_route = express.Router();

const cartItems_controller = require('../controller/cartItemsController');
const { verifyToken } = require("../middleware/auth")

cartItem_route.post("/add-cart-items", verifyToken, cartItems_controller.addCartItems);

module.exports = cartItem_route;