const express = require("express");
const productcategory_route = express.Router();

const productcategory_controller = require("../controller/productCategoryController");

productcategory_route.post(
  "/add-product-category",
  productcategory_controller.addProductCategory
);

productcategory_route.put(
  "/update-product-category/:productCategoryId",
  productcategory_controller.updateProductCategory
);

productcategory_route.get(
  "/all-product-category",
  productcategory_controller.getProductCategory
);

module.exports = productcategory_route;