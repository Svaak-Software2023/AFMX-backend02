const ProductDeliveryAddressModel = require("../model/productDeliveryAddressModel");
const CartModel = require("../model/cartModel");
const { errorMsg } = require("../const/errorHelper");

// Create a delivery address
const createProductDeliveryAddress = async (bodyData, loggedInUser) => {
  const {
    clientPhone,
    clientAddress,
    clientCity,
    clientState,
    clientCountry,
    clientPostalCode,
  } = bodyData;

  // Check if essential fields are provided
  if (!clientAddress || !clientCountry || !clientPostalCode) {
    throw new Error("Required fields are missing");
  }

  // Check if the cart exists
  const cart = await CartModel.findOne({ cartId: loggedInUser.clientId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  // Find the largest existing deliveryAddressId
  const maxProductDeliveryId = await ProductDeliveryAddressModel.findOne(
    {},
    { deliveryAddressId: 1 },
    { sort: { deliveryAddressId: -1 } }
  );

  // Calculate the next deliveryAddressId
  const nextDeliveryAddressId = maxProductDeliveryId
    ? maxProductDeliveryId.deliveryAddressId + 1
    : 1;

  // Create new delivery address data
  const newDeliveryAddress = new ProductDeliveryAddressModel({
    deliveryAddressId: nextDeliveryAddressId,
    cartId: cart.cartId,
    clientPhone,
    clientAddress,
    clientCity,
    clientState,
    clientCountry,
    clientPostalCode,
  });

  const savedAddress = await newDeliveryAddress.save();

  return savedAddress;
};

// Update the deliveryAddress
const updateProductDeliveryAddress = async (
  loggedInUser,
  paramsData,
  bodyData
) => {
  const { deliveryAddressId } = paramsData;

  const {
    clientPhone,
    clientAddress,
    clientCity,
    clientState,
    clientCountry,
    clientPostalCode,
  } = bodyData;

  // Find the product delivery address data
  const deliveryAddressData = await ProductDeliveryAddressModel.findOne({
    deliveryAddressId: deliveryAddressId,
  }).select("deliveryAddressId cartId -_id");

  if (!deliveryAddressData) {
    throw new Error(errorMsg.PRODUCT_DELIVERY_ADDRESS_NOT_FOUND_ERROR);
  }

  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId cartId -_id");

  if (!cart) {
    throw new Error("Cart does not exists");
  }

  // Validate if the delivery address belongs to the user's cart
  if (deliveryAddressData.cartId !== cart.cartId) {
    throw new Error("Unauthorized: You can only update your own address");
  }

  // Update the address details
  const updatedAddress = await ProductDeliveryAddressModel.findOneAndUpdate(
    { deliveryAddressId },
    {
      $set: {
        clientPhone,
        clientAddress,
        clientCity,
        clientState,
        clientCountry,
        clientPostalCode,
      },
    },
    { new: true }
  );

  if (!updatedAddress) {
    throw new Error("Failed to update address");
  }

  return updatedAddress;
};

// Get API's for single delivery address
const getSingleProductDeliveryAddress = async (paramsData, loggedInUser) => {
  const { deliveryAddressId } = paramsData;

  // Check existing department
  const deliveryAddressData = await ProductDeliveryAddressModel.findOne({
    deliveryAddressId,
  });

  if (!deliveryAddressData) {
    throw new Error(errorMsg.PRODUCT_DELIVERY_ADDRESS_NOT_FOUND_ERROR);
  }

  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId cartId -_id");

  if (!cart) {
    throw new Error("Cart does not exists");
  }

  // Validate if the delivery address belongs to the user's cart
  if (deliveryAddressData.cartId !== cart.cartId) {
    throw new Error("Only authorized users can access his own address");
  }

  return deliveryAddressData;
};

// Get all the delivery addresses
const getAllProductDeliveryAddress = async (loggedInUser) => {
  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId cartId -_id");

  if (!cart) {
    throw new Error("Cart does not exists");
  }

  // Find all delivery addresses associated with the cart
  const productDeliveryAddress = await ProductDeliveryAddressModel.find({
    cartId: cart.cartId,
  });

  if (!productDeliveryAddress) {
    throw new Error("No ProductDeliveryAddress Found");
  }
  return productDeliveryAddress;
};

// Delete the delivery address
const deleteSingleProductDeliveryAddress = async (loggedInUser, paramsData) => {
  const { deliveryAddressId } = paramsData;

  // Find the product delivery address data
  const deliveryAddressData = await ProductDeliveryAddressModel.findOne({
    deliveryAddressId: deliveryAddressId,
  }).select("deliveryAddressId cartId -_id");

  if (!deliveryAddressData) {
    throw new Error(errorMsg.PRODUCT_DELIVERY_ADDRESS_NOT_FOUND_ERROR);
  }

  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId cartId -_id");

  if (!cart) {
    throw new Error("Cart does not exists");
  }

  // Validate if the delivery address belongs to the user's cart
  if (deliveryAddressData.cartId !== cart.cartId) {
    throw new Error("Unauthorized: You can only delete your own address");
  }

  // Delete the delivery address
  const deletedAddress = await ProductDeliveryAddressModel.findOneAndDelete({
    deliveryAddressId,
  });

  if (!deletedAddress) {
    throw new Error("Failed to delete address");
  }

  return deletedAddress;
};

module.exports = {
  createProductDeliveryAddress,
  updateProductDeliveryAddress,
  getSingleProductDeliveryAddress,
  getAllProductDeliveryAddress,
  deleteSingleProductDeliveryAddress,
};
