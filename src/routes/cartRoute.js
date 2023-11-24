const express = require("express");
const cart_route = express.Router();

const cart_controller = require("../controller/cartController");

cart_route.post("/add-cart", cart_controller.cartAdd);


module.exports = cart_route;
