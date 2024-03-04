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

const getProductCategory = async () => {
  const category = await ProductCategoryModel.find({});

  if (!category) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }

  return category;
};

module.exports = {
  addProductCategory,
  getProductCategory,
};
