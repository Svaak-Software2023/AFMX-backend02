const express = require("express");
const product_route = express.Router();

product_route.use(express.static("public"));

// Passing the json incoming request
product_route.use(express.json());
product_route.use(express.urlencoded({ extended:true }));

const filesUpload = require('../middleware/multer'); 

const product_controller = require('../controller/productController');

product_route.post('/add-product', filesUpload.array("productImage"), product_controller.addProduct);

product_route.get('/all-product', product_controller.getProduct)
module.exports = product_route;
