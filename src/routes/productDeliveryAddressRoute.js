const express = require("express");
const productDeliveryAdress_route = express.Router();

const productDeliveryAdress_controller = require("../controller/productDeliveryAddressController");

const { verifyToken } = require("../middleware/auth");
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
  "/address/single-address/:deliveryAddressId",
  verifyToken,
  productDeliveryAdress_controller.getSingleProductDeliveryAddress
);

productDeliveryAdress_route.get(
  "/address/all-address",
  verifyToken,
  productDeliveryAdress_controller.getAllProductDeliveryAddress
);

productDeliveryAdress_route.delete(
  "/address/delete-address/:deliveryAddressId",
  verifyToken,
  productDeliveryAdress_controller.deleteSingleProductDeliveryAddress
);

module.exports = productDeliveryAdress_route;
