const express = require("express");
const productDeliveryAdress_route = express.Router();

const productDeliveryAdress_controller = require("../controller/productDeliveryAddressController");
const productcategory_route = require("./productCategoryRoute");

productDeliveryAdress_route.post(
  "/create-delivery-address",
  productDeliveryAdress_controller.createProductDeliveryAddress
);

productDeliveryAdress_route.patch(
    "/update-delivery-address/:deliveryAddressId", 
    productDeliveryAdress_controller.updateProductDeliveryAddress
);

productDeliveryAdress_route.get(
    "/single-delivery-address",
    productDeliveryAdress_controller.getSingleCreateProductDeliveryAddress
);

productDeliveryAdress_route.get(
    "/all-delivery-address", 
    productDeliveryAdress_controller.getAllCreateProductDeliveryAddress
);



module.exports = productDeliveryAdress_route;
