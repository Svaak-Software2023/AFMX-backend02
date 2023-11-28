const express = require("express");
const clientPaymentOption_route = express.Router();

const clientPaymentOption_Controller = require("../controller/clientPaymentOptionController");

clientPaymentOption_route.post(
  "/client/payment-option",
  clientPaymentOption_Controller.createPaymentOption
);


module.exports = clientPaymentOption_route;