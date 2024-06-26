const express = require("express");
const product_route = express.Router();

product_route.use(express.static("public"));

// Passing the json incoming request
product_route.use(express.json());
product_route.use(express.urlencoded({ extended: true }));

const filesUpload = require("../middleware/multer");

const product_controller = require("../controller/productController");

product_route.post(
  "/add-product",
  filesUpload.array("productImage"),
  product_controller.addProduct
);

product_route.put(
  "/update-product",
  filesUpload.array("productImage"),
  product_controller.updateProduct
);

product_route.patch(
  "/delete-product/:productId",
  product_controller.deleteProduct
);

product_route.get("/products/:productId", product_controller.getSingleProduct);

product_route.get("/all-product/:categoryId", product_controller.getProduct);

module.exports = product_route;
