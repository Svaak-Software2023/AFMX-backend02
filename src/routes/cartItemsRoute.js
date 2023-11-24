const express = require('express');
const cartItem_route = express.Router();

const cartItems_controller = require('../controller/cartItemsController');

cartItem_route.post("/add-cart-items", cartItems_controller.addCartItems);

module.exports = cartItem_route;