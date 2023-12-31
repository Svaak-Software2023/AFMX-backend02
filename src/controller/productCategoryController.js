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
  getProductCategory,
};
