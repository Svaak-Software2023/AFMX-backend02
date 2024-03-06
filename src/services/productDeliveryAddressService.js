const ProductDeliveryAddressModel = require("../model/productDeliveryAddressModel");
const CartModel = require("../model/cartModel");
const { errorMsg } = require("../const/errorHelper");

// Create a delivery address
const createProductDeliveryAddress = async (bodyData, loggedInUser) => {
  const {
    cartId,
    clientPhone,
    clientAddress,
    clientCity,
    clientState,
    clientCountry,
    clientPostalCode,
  } = bodyData;

  // Check if essential fields are provided
  if (!cartId || !clientAddress || !clientCountry || !clientPostalCode) {
    throw new Error("Required fields are missing");
  }

  // Check if the cart exists
  const cart = await CartModel.findOne({ cartId });

  if (!cart) {
    throw new Error("Cart not found");
  }

  // Validate the authorization to add delivery address
  if (cart.clientId !== loggedInUser.clientId) {
    throw new Error("Only authorized users can add the delivery address");
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
    cartId,
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

// Get API's for single data
const getSingleCreateProductDeliveryAddress = async (
  deliveryAddressSingleDetails
) => {
  const { deliveryAddressId } = deliveryAddressSingleDetails;

  // Check existing department
  const deliveryAddressData = await ProductDeliveryAddressModel.findOne({
    deliveryAddressId,
  });

  if (!deliveryAddressData) {
    throw new Error(errorMsg.FETCH_USERS_ID_MISSING_ERROR);
  }
  return deliveryAddressData;
};

const getAllCreateProductDeliveryAddress = async () => {
  const productDeliveryAddressData = await ProductDeliveryAddressModel.find({});

  if (!productDeliveryAddressData) {
    throw new Error(errorMsg.FETCH_USERS_FAILED);
  }
  return productDeliveryAddressData;
};

module.exports = {
  createProductDeliveryAddress,
  updateProductDeliveryAddress,
  getAllCreateProductDeliveryAddress,
  getSingleCreateProductDeliveryAddress,
};
