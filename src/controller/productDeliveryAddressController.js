const productDeliveryAddressService = require("../services/productDeliveryAddressService");

// Create Delivery Address Controllers
const createProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the create product delivery address response
    const productDeliveryAddressResponse =
      await productDeliveryAddressService.createProductDeliveryAddress(
        req.body,
        loggedInUser
      );
    return res.json({
      message: "Address Created !",
      productDeliveryAddressResponse,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// Update Delivery Address Controllers
const updateProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the update product delivery address response
    const updateDeliveryAddressResponse =
      await productDeliveryAddressService.updateProductDeliveryAddress(
        loggedInUser,
        req.params,
        req.body
      );
    if (updateDeliveryAddressResponse) {
      return res.status(200).json({
        message: "Updated Successfully",
        updateDeliveryAddressResponse,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Not Updated", updateDeliveryAddressResponse });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Single Delivery Address Controllers
const getSingleProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the get single delivery address response
    const getSingleDeliveryAddressResponse =
      await productDeliveryAddressService.getSingleProductDeliveryAddress(
        req.params,
        loggedInUser
      );
    return res.json({
      message: "Fetch single delivery address details successfully",
      getSingleDeliveryAddressResponse,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get All Delivery Address Controllers
const getAllProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the all product delivery address response
    const getAllDeliveryAddressResponse =
      await productDeliveryAddressService.getAllProductDeliveryAddress(
        loggedInUser
      );
    return res.json({
      message: "Fetch all prduct devlivery address details successfully ",
      getAllDeliveryAddressResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete Single Delivery Address Controllers
const deleteSingleProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the delete single product delivery address response
    const deleteDeliveryAddressResponse =
      await productDeliveryAddressService.deleteSingleProductDeliveryAddress(
        loggedInUser,
        req.params
      );
    if (deleteDeliveryAddressResponse) {
      return res.status(200).json({
        message: "Deleted Successfully",
        deleteDeliveryAddressResponse,
      });
    } else {
      return res
        .status(404)
        .json({ message: "Not Deleted", deleteDeliveryAddressResponse });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createProductDeliveryAddress,
  updateProductDeliveryAddress,
  getSingleProductDeliveryAddress,
  getAllProductDeliveryAddress,
  deleteSingleProductDeliveryAddress,
};
