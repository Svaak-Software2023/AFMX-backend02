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
    const maxImages = 5;
    const requiredFields = [
      "productCategoryName",
      "productName",
      "productDescription",
    ];

    // Check if product images are provided and do not exceed the maximum limit
    if (!productImagePath || productImagePath.length === 0) {
      throw new Error("No images uploaded. Please upload at least one image.");
    }

    // Check if product images exceed the maximum limit
    if (productImagePath.length > maxImages) {
      throw new Error(`Exceeded the maximum limit of ${maxImages} images.`);
    }

    console.log("productDetails", productDetails);
    // Check if all required fields are present and not empty
    if (
      requiredFields.some(
        (field) => !productDetails[field] || productDetails[field].trim() === ""
      )
    ) {
      throw new Error(
        `Missing required fields: ${requiredFields
          .filter(
            (field) =>
              !productDetails[field] || productDetails[field].trim() === ""
          )
          .join(", ")}`
      );
    }

    // Validate product category
    const productCategory = await ProductCategoryModel.findOne({
      productCategoryName: productDetails.productCategoryName,
    });
    if (!productCategory) {
      throw new Error(errorMsg.CATEGORY_NOT_EXISTS);
    }
    if (!productCategory.isActive) {
      throw new Error(errorMsg.PRODUCT_CATEGORY_NOT_ACTIVE);
    }

    // Check for existing product with the same name
    const existingProduct = await ProductModel.findOne({
      productName: {
        $regex: new RegExp(`^${productDetails.productName}$`, "i"),
      },
    });
    if (existingProduct) {
      throw new Error(`Product '${productDetails.productName}' already exists`);
    }
    // Constant for converting percentage to decimal
    const PERCENTAGE_TO_DECIMAL = 0.01;

    // Calculate final product MRP after discount
    let discountedProductMRP;
    if (
      typeof Number(productDetails.discount) === "number" &&
      productDetails.discount >= 0 &&
      productDetails.discount <= 100
    ) {
      discountedProductMRP =
        productDetails.productMRP *
        (1 - productDetails.discount * PERCENTAGE_TO_DECIMAL);
    } else {
      // Handle invalid discount input
      throw new Error(
        "Invalid discount value. Discount must be a number between 0 and 100."
      );
    }

    // Upload product images to Cloudinary
    const uploadProductImage =
      await cludinaryImageUpload.fileUploadInCloudinary(
        productImagePath,
        "productImages"
      );
    const arrImages = uploadProductImage.map((image) => image.url);

    // Find the largest existing productId
    const maxProductCount = await ProductModel.findOne(
      {},
      { productId: 1 },
      { sort: { productId: -1 } }
    );

    // Calculate the next productId
    const nextProductId = maxProductCount ? maxProductCount.productId + 1 : 1;

    const productData = new ProductModel({
      productId: nextProductId,
      productCategoryId: productCategory.productCategoryId,
      productDescription: productDetails.productDescription,
      productName: productDetails.productName,
      productImage: arrImages,
      productBrand: productDetails.productBrand,
      containerType: productDetails.containerType,
      containerSize: productDetails.containerSize,
      cleanerForm: productDetails.cleanerForm,
      readyToUseOrConcentrate: productDetails.readyToUseOrConcentrate,
      fragrances: productDetails.fragrances,
      upcCode: productDetails.upcCode,
      skuCode: productDetails.skuCode,
      productMRP: discountedProductMRP,
      productPrice: productDetails.productPrice,
      quantity: productDetails.quantity,
      discount: productDetails.discount,
    });

    const newProduct = await productData.save();
    return newProduct;
  } catch (error) {
    throw error;
  }
};

// Update the product details with the exiting product
const updateProduct = async (productDetails, paramsData) => {
  const { productId } = paramsData;

  if (!productId) {
    throw new Error(`Product Id is required`);
  }

  const {
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
  } = productDetails;

  const product = await ProductModel.findOne({ productId, isActive: true });
  if (!product) {
    throw new Error(
      `Product with ID ${productId} does not exist or is not active`
    );
  }

  //Update the product
  const updatedProduct = await ProductModel.findOneAndUpdate(
    { productId: productId },
    {
      $set: {
        productName: productName,
        productDescription: productDescription,
        productBrand: productBrand,
        containerType: containerType,
        containerSize: containerSize,
        cleanerForm: cleanerForm,
        readyToUseOrConcentrate: readyToUseOrConcentrate,
        fragrances: fragrances,
        upcCode: upcCode,
        skuCode: skuCode,
        productMRP: productMRP,
        productPrice: productPrice,
        quantity: quantity,
        discount: discount,
        updatedDate: new Date(),
      },
    },
    {
      new: true,
    }
  );

  if (!updatedProduct) {
    throw new Error("Failed to update product");
  }

  return updatedProduct;
};

// Update the product active true or false
const deleteProduct = async (bodyData, paramsData) => {
  const { productId } = paramsData;

  const { isActive } = bodyData;

  const updatedProduct = await ProductModel.findOneAndUpdate(
    { productId: productId },
    {
      $set: {
        isActive,
        updatedDate: new Date(),
      },
    },
    {
      new: true,
      upsert: false,
    }
  );

  if (!updatedProduct) {
    throw new Error("Cannot delete product or it does not exist");
  }

  return updatedProduct;
};

// Get a single product based on the specified the productId
const getSingleProduct = async (paramsData) => {
  const { productId } = paramsData;

  if (!productId) {
    throw new Error(`Product Id is required`);
  }

  const product = await ProductModel.findOne({ productId, isActive: true });

  if (!product) {
    throw new Error(`Neither Product exists nor isActive`);
  }
  console.log("product found", product);

  return product;
};

// Get a list of products based on the specified the categoryId
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
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProduct,
};
