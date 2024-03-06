const express = require("express");
const productDeliveryAdress_route = express.Router();


const productDeliveryAdress_controller = require("../controller/productDeliveryAddressController");

const { verifyToken } = require('../middleware/auth')
productDeliveryAdress_route.post(
  "/address/create-address",
  verifyToken,
  productDeliveryAdress_controller.createProductDeliveryAddress
);

productDeliveryAdress_route.patch(
    "/address/update-address/:deliveryAddressId",
    verifyToken,
    productDeliveryAdress_controller.updateProductDeliveryAddress
);

productDeliveryAdress_route.get(
    "/address/single-address",
    productDeliveryAdress_controller.getSingleCreateProductDeliveryAddress
);

productDeliveryAdress_route.get(
    "/address/all-address", 
    productDeliveryAdress_controller.getAllCreateProductDeliveryAddress
);


module.exports = productDeliveryAdress_route;