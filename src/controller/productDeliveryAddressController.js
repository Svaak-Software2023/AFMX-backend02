const productDeliveryAddressService = require("../services/productDeliveryAddressService");

const createProductDeliveryAddress = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the product delivery address response
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

const updateProductDeliveryAddress = async (req, res) => {
    try {
        const loggedInUser = req.decoded;
      const updateDeliveryAddressResponse = await productDeliveryAddressService.updateProductDeliveryAddress(
          loggedInUser,
          req.params,
          req.body
      );
      if (updateDeliveryAddressResponse) {
        return res
          .status(200)
          .json({ message: "Updated Successfully", updateDeliveryAddressResponse });
      } else {
        return res.status(404).json({ message: "Not Updated", updateDeliveryAddressResponse });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};

// Get Single Department
const getSingleCreateProductDeliveryAddress = async (req, res) => {
    try {
      // Handle the get department response
      const getSingleResponse =
        await productDeliveryAddressService.getSingleCreateProductDeliveryAddress(req.body);
      return res.json({
        message: "Fetch single delivery address details successfully",
        getSingleResponse,
      });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  };


const getAllCreateProductDeliveryAddress = async (req, res) => {
    try {
      const getResponse = await productDeliveryAddressService.getAllCreateProductDeliveryAddress();
      return res.json({
        message: "Fetch all prduct devlivery address details successfully ",
        getResponse,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
};
  
module.exports = {
  createProductDeliveryAddress,
  updateProductDeliveryAddress,
  getAllCreateProductDeliveryAddress,
  getSingleCreateProductDeliveryAddress
};