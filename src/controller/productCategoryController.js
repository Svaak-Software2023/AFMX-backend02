const productCategoryService = require("../services/productCategoryService");

const addProductCategory = async (req, res) => {
  try {
    // Handle the product category response.
    const categoryResponse = await productCategoryService.addProductCategory(
      req.body
    );

    return res.json({ message: "Category Added !", categoryResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const updateProductCategory = async (req, res) => {
  try {
    // Handle the product category response.
    const categoryUpdateResponse = await productCategoryService.updateProductCategory(
      req.body,
      req.params
    );
    return res.json({ message: "Category Updated !", categoryUpdateResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const deleteProductCategory = async (req, res) => {
  try {
    // Handle the product category response.
    const categoryDeleteResponse = await productCategoryService.deleteProductCategory(
      req.body,
      req.params
    );
    return res.json({ message: "Category Deleted !", categoryDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

const getProductCategory = async (req, res) => {
  try {
    const productCategoryResponse =
      await productCategoryService.getProductCategory();
    return res
      .status(200)
      .json({
        message: "Product category retrieved successfully",
        productCategoryResponse,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


module.exports = {
  addProductCategory,
  updateProductCategory,
  deleteProductCategory,
  getProductCategory,
};
