const { errorMsg } = require("../const/errorHelper");
const CartItemsModel = require("../model/cartItemsModel");
const CartModel = require("../model/cartModel");
const ClientModel = require("../model/clientModel");
const ProductModel = require("../model/productModel");

const addCartItems = async (cartItemsDetails, loggedInUser) => {
  const { cartId, productId, noOfProducts, productPrice } = cartItemsDetails;

  // Check if the cart exists
  const existingCart = await CartModel.findOne({ cartId });
  if (!existingCart) {
    throw new Error(errorMsg.CART_ID_NOT_VALID);
  }

  // Check if the client exists and is active
  const client = await ClientModel.findOne({
    clientId: loggedInUser.clientId,
  }).select("clientId isActive -_id");
  if (!client) {
    throw new Error(errorMsg.CLIENT_NOT_FOUND);
  }
  if (!client.isActive) {
    throw new Error(errorMsg.INACTIVE_CLIENT_CART_ERROR);
  }

  // Ensure that the client is authorized to add items to this cart
  if (client.clientId !== existingCart.clientId) {
    throw new Error("Only authorized user can add the item to the cart");
  }

  // Check if the product exists
  const product = await ProductModel.findOne({ productId }).select(
    "productId productPrice -_id"
  );
  if (!product) {
    throw new Error(errorMsg.PRODUCT_ID_INVALID);
  }

  // Validate the price of the product
  if (product.productPrice !== productPrice) {
    throw new Error(errorMsg.PRODUCT_PRICE_INVALID);
  }


// Find the largest existing cartItemId
const maxCartItem = await CartItemsModel.findOne({}, { cartItemId: 1 }, { sort: { cartItemId: -1 } });

// Calculate the next cartItemId
const nextCartItemId = maxCartItem ? maxCartItem.cartItemId + 1 : 1;

  // Create a new cart item
  const newCartItems = new CartItemsModel({
    cartItemId: nextCartItemId,
    cartId,
    productId,
    noOfProducts,
    productPrice,
  });

  // Save the new cart item
  const savedCartItems = await newCartItems.save();
  return savedCartItems;
};

module.exports = {
  addCartItems,
};
