const ProductCategoryModel = require('../model/productCategoryModel');


const addProductCategory = async(categoryDetails) => {
    const {
        productCategoryName,
        productCategoryDescription,
        createdDate,
        updatedDate,
        isActive
    } = categoryDetails;

    const existingCategory = await ProductCategoryModel.findOne({
         productCategoryName: { $regex: new RegExp(`^${productCategoryName}$`, 'i') } 
        });

  if (existingCategory) {
    throw new Error(`Category '${productCategoryName}' already exists`);
  }
  
    // Fetch count of product category
    const productCategory = await ProductCategoryModel.countDocuments();

    const categoryData = new ProductCategoryModel({
        productCategoryId: productCategory + 1,
        productCategoryName,
        productCategoryDescription,
        createdDate,
        updatedDate,
        isActive
    })

    const newProductCategory = await categoryData.save();
    return newProductCategory;
}

module.exports = {
    addProductCategory,
}