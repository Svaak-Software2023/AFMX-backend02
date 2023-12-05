const Product = require("../model/productModel");
const ProductCategoryModel = require('../model/productCategoryModel');
const { errorMsg } = require("../const/errorHelper");


const addProduct = async (productDetails, fileName) => {
  const {
    productCategoryName,
    productName,
    productDescription,
    productMRP,
    productPrice,
    createdDate,
    updatedDate,
    isActive
  } = productDetails;

  // Check if department with the same name already exists
  const productCategory = await ProductCategoryModel.findOne({ productCategoryName });

  if(!productCategory ) {
    throw new Error(errorMsg.CATEGORY_NOT_EXISTS);
  }

    if (!productCategory.isActive) { 
      throw new Error(errorMsg.PRODUCT_CATEGORY_NOT_ACTIVE);
    } 

// Storing multiple image in arrImages   
  const arrImages = [];
  for (let i = 0; i < fileName.length; i++) {
    arrImages[i] = fileName[i].filename;
  }

  // Fetch count of the product
  const productCount = await Product.find().countDocuments();

  const productData = new Product({
    productId: productCount + 1,
    productCategoryId: productCategory.productCategoryId,
    productImage: arrImages,
    productName,
    productDescription,
    productMRP,
    productPrice,
    createdDate,
    updatedDate,
    isActive
  });

  const newProduct = await productData.save();
  return newProduct;
};

module.exports = {
  addProduct,
};
