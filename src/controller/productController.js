const productService = require("../services/productService");
const uploadToVSCode = require("../middleware/fileHandler");
const path = require("path");
const fs = require("fs");

const addProduct = async (req, res) => {
  try {
    const productResponse = await productService.addProduct(
      req.body,
      req.files
    );
      console.log("product response: " , productResponse);
    // Assuming req.files is an array of files
    const uploadedFiles = req.files.map((file) => file.path);
    const targetDirectories = Array(req.files.length).fill(
      path.join(__dirname, "../public/productImages")
    );

    await uploadToVSCode(uploadedFiles, targetDirectories);

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

const getProduct = async (req, res) => {
  try {
    const productResponse = await productService.getProduct();
    return res.status(200).json({ message: "Product retrieved successfully", productResponse });
    
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getProduct
};
