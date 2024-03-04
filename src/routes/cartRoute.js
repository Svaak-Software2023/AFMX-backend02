const express = require("express");
const cart_route = express.Router();

const cart_controller = require("../controller/cartController");

const { verifyToken } = require("../middleware/auth")

cart_route.post("/add-cart", verifyToken, cart_controller.cartAdd);


module.exports = cart_route;
