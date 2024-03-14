const express = require('express');
const cartItem_route = express.Router();

const cartItems_controller = require('../controller/cartItemsController');
const { verifyToken } = require("../middleware/auth")

cartItem_route.post("/add-cart-items", verifyToken, cartItems_controller.addCartItems);

cartItem_route.patch("/cartItems/update-quantity/:cartItemId", verifyToken, cartItems_controller.addOrUpdateQuantity);

cartItem_route.patch("/cartItems/addAndMoveSaveLater", verifyToken, cartItems_controller.addOrMoveSaveForLater)

module.exports = cartItem_route;