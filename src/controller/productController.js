const productService = require("../services/productService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    // To handle the multiple image path
    const productImagePath = req.files.map((file) => file.path);

    // Recieved the product respose
    const productResponse = await productService.addProduct(
      req.body,
      productImagePath
    );

    // Assuming req.files is an array of files
    const uploadedFiles = req.files.map((file) => file.path);
    const targetDirectories = Array(req.files.length).fill(
      path.join(__dirname, "../public/productImages")
    );

    await uploadToVSCode(uploadedFiles, targetDirectories);

    // If upload succeeds, delete the uploaded file
    if (fs.existsSync(uploadedFiles)) {
      fs.unlinkSync(uploadedFiles);
      console.log("Deleted file", uploadedFiles);
    }

    return res.json({ message: "Products created!", productResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded files
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    // To handle the multiple image path
    const productImagePath = req.files.map((file) => file?.path);

    // Handle the product update response
    const productUpdateResponse = await productService.updateProduct(
      req.body,
      req.query,
      productImagePath
    );

    // Assuming req.files is an array of files
    const uploadedFiles = req.files.map((file) => file.path);
    const targetDirectories = Array(req.files.length).fill(
      path.join(__dirname, "../public/productImages")
    );

    await uploadToVSCode(uploadedFiles, targetDirectories);

    // If upload succeeds, delete the uploaded file
    if (fs.existsSync(uploadedFiles)) {
      fs.unlinkSync(uploadedFiles);
      console.log("Deleted file", uploadedFiles);
    }

    return res.json({ message: "Product updated!", productUpdateResponse });
  } catch (error) {
    // If an error occurs, delete the uploaded files
    if (req.files) {
      req.files.forEach((file) => {
        if (fs.existsSync(file.path)) {
          fs.unlinkSync(file.path);
        }
      });
    }

    return res.status(500).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    // Handle the product  response.
    const productDeleteResponse = await productService.deleteProduct(
      req.body,
      req.params
    );
    return res.json({ message: " Product Deleted !", productDeleteResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const productSingleResponse = await productService.getSingleProduct(
      req.params
    );
    return res
      .status(200)
      .json({
        message: "Single Product retrieved successfully",
        productSingleResponse,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productCategoryId = req.params.categoryId;
    const productResponse = await productService.getProduct(productCategoryId);
    return res
      .status(200)
      .json({ message: "Product retrieved successfully", productResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
  getProduct,
};
