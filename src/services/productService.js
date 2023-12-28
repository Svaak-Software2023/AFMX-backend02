const ProductModel = require("../model/productModel");
const ProductCategoryModel = require("../model/productCategoryModel");
const { errorMsg } = require("../const/errorHelper");

// Import the Cloudinary image upload helper
const cludinaryImageUpload = require("../helpers/cludinaryImageUpload");

/**
 * Adds a new product to the database with the provided details and image path.
 * @param {Object} productDetails - Details of the product.
 * @param {string[]} productImagePath - Path(s) of the product image(s).
 * @returns {Promise<Object>} - Newly added product details.
 */

const addProduct = async (productDetails, productImagePath) => {
  try {
    // Define the maximum number of allowed images
    const maxImages = 5;

    // Check if the number of uploaded images exceeds the set limit
    if (productImagePath.length > maxImages) {
      throw new Error(`Exceeded the maximum limit of ${maxImages} images.`);
    }

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
      isActive,
    } = productDetails;

    // Check if department with the same name already exists
    const productCategory = await ProductCategoryModel.findOne({
      productCategoryName,
    });

    if (!productCategory) {
      throw new Error(errorMsg.CATEGORY_NOT_EXISTS);
    }

    if (!productCategory.isActive) {
      throw new Error(errorMsg.PRODUCT_CATEGORY_NOT_ACTIVE);
    }

    // check if the product name already exists
    const existingProduct = await ProductModel.findOne({
      productName: { $regex: new RegExp(`^${productName}$`, "i") },
    });

    if (existingProduct) {
      throw new Error(`Product '${productName}' already exists`);
    }

    // Upload product images to Cloudinary
    const uploadProductImage =
      await cludinaryImageUpload.fileUploadInCloudinary(
        productImagePath,
        "productImages"
      );

    // Extract URLs from the uploaded images
    const arrImages = uploadProductImage.map((image) => image.url);

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
      isActive,
    });

    const newProduct = await productData.save();
    return newProduct;
  } catch (error) {
    // Handle and re-throw any encountered errors
    throw new Error(error.message);
  }
};

const getProduct = async (productCategoryId) => {
  const productCategory = await ProductCategoryModel.findOne({
    productCategoryId: productCategoryId,
  });

  if (!productCategory) {
    throw new Error(`Product Category does not exist`);
  }
  const products = await ProductModel.find({
    productCategoryId: productCategory.productCategoryId,
  });

  if (!products) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return products;
};
module.exports = {
  addProduct,
  getProduct,
};
