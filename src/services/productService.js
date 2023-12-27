const ProductModel = require("../model/productModel");
const ProductCategoryModel = require('../model/productCategoryModel');
const { errorMsg } = require("../const/errorHelper");

const addProduct = async (productDetails, fileName) => {
  console.log("addProduct", productDetails);
  const {
    productCategoryName,
    productName,
    productDescription,
    productBrand,
    containerType,
    containerSize,
    cleanerForm,
    readyToUseOrConcentrate,
    fragrances,
    upcCode,
    skuCode,
    productMRP,
    productPrice,
    quantity,
    discount,
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

  // check if the product name already exists 
  const existingProduct = await ProductModel.findOne({ 
        productName: { $regex : new RegExp(`^${productName}$`, 'i')} 
  });
 
  if (existingProduct) {
    throw new Error(`Product '${productName}' already exists`);
  }

// Storing multiple image in arrImages   
  const arrImages = [];
  for (let i = 0; i < fileName.length; i++) {
    arrImages[i] = fileName[i].filename;
  }

  // Fetch count of the product
  const productCount = await ProductModel.find().countDocuments();

  const productData = new ProductModel({
    productId: productCount + 1,
    productCategoryId: productCategory.productCategoryId,
    productImage: arrImages,
    productName,
    productDescription,
    productBrand,
    containerType,
    containerSize,
    cleanerForm,
    readyToUseOrConcentrate,
    fragrances,
    upcCode,
    skuCode,
    productMRP,
    productPrice,
    quantity,
    discount,
    createdDate,
    updatedDate,
    isActive
  });

  const newProduct = await productData.save();
  return newProduct;
};

const getProduct = async () => {
  const products = await ProductModel.find({});

  if(!products) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return products;
}
module.exports = {
  addProduct,
  getProduct
};
