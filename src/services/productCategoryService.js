const { errorMsg } = require("../const/errorHelper");
const ProductCategoryModel = require("../model/productCategoryModel");

const addProductCategory = async (categoryDetails) => {
  const {
    productCategoryName,
    productCategoryDescription,
    createdDate,
    updatedDate,
    isActive,
  } = categoryDetails;

  const existingCategory = await ProductCategoryModel.findOne({
    productCategoryName: {
      $regex: new RegExp(`^${productCategoryName}$`, "i"),
    },
  });

  if (existingCategory) {
    throw new Error(`Category '${productCategoryName}' already exists`);
  }

  // Find the largest existing productCategoryId
  const maxProductCategoryCount = await ProductCategoryModel.findOne(
    {},
    { productCategoryId: 1 },
    { sort: { productCategoryId: -1 } }
  );

  // Calculate the next productCategoryId
  const nextProductCategoryId = maxProductCategoryCount
    ? maxProductCategoryCount.productCategoryId + 1
    : 1;

  const categoryData = new ProductCategoryModel({
    productCategoryId: nextProductCategoryId,
    productCategoryName,
    productCategoryDescription,
    createdDate,
    updatedDate,
    isActive,
  });

  const newProductCategory = await categoryData.save();
  return newProductCategory;
};

const updateProductCategory = async (categoryDetails, paramsData) => {
  const { productCategoryId } = paramsData;

  if (!productCategoryId) {
    throw new Error("Product Category Id is required");
  }

  const { productCategoryName, productCategoryDescription } = categoryDetails;

  const existingCategory = await ProductCategoryModel.findOne({
    productCategoryId,
    isActive: true,
  });
  if (!existingCategory) {
    throw new Error("Neither category exists nor is active");
  }

  const dataToUpdate = await ProductCategoryModel.findOneAndUpdate(
    { productCategoryId: productCategoryId },
    {
      $set: {
        productCategoryName,
        productCategoryDescription,
        updatedDate: new Date(),
      },
    },
    {
      new: true,
    }
  );

  if (!dataToUpdate) {
    throw new Error("Cannot update product category");
  }

  return dataToUpdate;
};

const deleteProductCategory = async (bodyData, paramsData) => {
  const { productCategoryId } = paramsData;

  const { isActive } = bodyData;

  const updatedProductCategory = await ProductCategoryModel.findOneAndUpdate(
    { productCategoryId: productCategoryId },
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

  if (!updatedProductCategory) {
    throw new Error("Cannot delete product category or it does not exist");
  }

  return updatedProductCategory;
};

const getProductCategory = async () => {
  const category = await ProductCategoryModel.find({});

  if (!category) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }

  return category;
};

module.exports = {
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategory,
};
