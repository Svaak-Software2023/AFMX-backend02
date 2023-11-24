const express = require('express');
const productcategory_route = express.Router();

const productcategory_controller = require('../controller/productCategoryController');

productcategory_route.post("/add-category", productcategory_controller.addProductCategory);

module.exports = productcategory_route;