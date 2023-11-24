const Product = require("../model/productModel");
const ProductCategoryModel = require('../model/productCategoryModel');


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
    throw new Error('Category does not exists')
  }

    if (!productCategory.isActive) { 
      throw new Error("Product Category is not active");
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
