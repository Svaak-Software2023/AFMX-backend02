const { errorMsg } = require("../const/errorHelper");
const cartModel = require("../model/cartModel");
const CartModel = require("../model/cartModel");
const ClientModel = require("../model/clientModel");

const cartAdd = async (cartDetails, loggedInUser) => {
  const {
    clientId: requestedClientId,
    deliveryCharges,
    discountPrice,
  } = cartDetails;

  // // Check if the client exists and is active
  const client = await ClientModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId isActive -_id");

  if (!client) {
    throw new Error(errorMsg.CLIENT_NOT_FOUND);
  }

  if (!client.isActive) {
    throw new Error(errorMsg.INACTIVE_CLIENT_CART_ERROR);
  }
  // Ensure the client adding to the cart is authorized
  if (requestedClientId !== client.clientId) {
    throw new Error("Only authorized client can be added to cart");
  }

  // Find the largest existing cartId
  const maxCart = await cartModel.findOne(
    {},
    { cartId: 1 },
    { sort: { cartId: -1 } }
  );

  // Calculate the next cartId
  const nextCartId = maxCart ? maxCart.cartId + 1 : 1;

  // Create new cart entry
  const newCart = new CartModel({
    clientId: requestedClientId,
    cartId: nextCartId,
    deliveryCharges,
    discountPrice,
  });

  const savedCart = await newCart.save();
  return savedCart;
};

module.exports = {
  cartAdd,
};
