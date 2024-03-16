const { errorMsg } = require("../const/errorHelper");
const CartItemsModel = require("../model/cartItemsModel");
const CartModel = require("../model/cartModel");
const ClientModel = require("../model/clientModel");
const ProductModel = require("../model/productModel");

// Add the items into the cart
const addCartItems = async (cartItemsDetails, loggedInUser) => {
  const { cartId, productId, noOfProducts, productPrice } = cartItemsDetails;

  // Check if the cart exists and the client is authorized
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

    // Check if the product is already in the cart
    const existingItem = await CartItemsModel.findOne({ cartId, productId });
    if (existingItem) {
      throw new Error(errorMsg.PRODUCT_ALREADY_IN_CART);
    }

  // Find the largest existing cartItemId
  const maxCartItem = await CartItemsModel.findOne(
    {},
    { cartItemId: 1 },
    { sort: { cartItemId: -1 } }
  );

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


// Update the cart items quantity
const addOrUpdateQuantity = async (loggedInUser, paramsData, bodyData) => {
  const { cartItemId } = paramsData;

  const { positiveAndNegativeValue } = bodyData;
  console.log("positive and negative", positiveAndNegativeValue);

  if (positiveAndNegativeValue === undefined) {
    throw new Error("Required fields are missing");
  }

  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({ clientId: loggedInUser.clientId });
  console.log("cart", cart);
  if (!cart) {
    throw new Error("Cart not found");
  }

  // Find the cart item to update
  const cartItems = await CartItemsModel.findOne({
    cartId: cart.cartId,
    cartItemId: cartItemId,
  });

  if (!cartItems) {
    throw new Error("Only authorized user can update the cart items ");
  }

  const fetchProduct = await ProductModel.findOne({
    productId: cartItems.productId,
  });
  console.log("Fetching product", fetchProduct);
  console.log("Fetching product quantity", fetchProduct.quantity);

  console.log("cartItems", cartItems.cartItemId);

  console.log("cartItems", cartItems);
  let updateQuantity;

  if (positiveAndNegativeValue) {
    if (cartItems.noOfProducts < fetchProduct.quantity) {
      updateQuantity = await CartItemsModel.findOneAndUpdate(
        { cartItemId: cartItems.cartItemId },
        { $inc: { noOfProducts: 1 } },
        { new: true }
      );
    } else {
      throw new Error("Cannot increase quantity. Maximum quantity reached.");
    }
  } else {
    if (cartItems.noOfProducts > 1) {
      updateQuantity = await CartItemsModel.findOneAndUpdate(
        { cartItemId: cartItems.cartItemId },
        { $inc: { noOfProducts: -1 } },
        { new: true }
      );
    } else {
      updateQuantity = cartItems;
      console.log("update quantity", updateQuantity);
      console.log("cartItems--------->", cartItems);
    }
  }

  if (!updateQuantity) {
    throw new Error("Failed to update the quantity");
  }

  return updateQuantity;
};


// Add to save for later
const addOrMoveSaveForLater = async (loggedInUser, bodyData) => {
  const { cartItemId, saveForLater } = bodyData;

  if (!cartItemId || saveForLater === undefined) {
    throw new Error("Required fields are missing");
  }

  const cart = await CartModel.findOne({ clientId: loggedInUser.clientId });
  if (!cart) {
    throw new Error("There is no cart exists related to this cart items");
  }

  let cartItems = await CartItemsModel.findOne({
    cartId: cart.cartId,
    cartItemId: cartItemId,
  });

  if (!cartItems) {
    throw new Error("Only authorized user can save for later the cart items ");
  }
  console.log("saveforlater", saveForLater);

  // Update the save for later into cart items
  if (cartItems.saveForLater !== saveForLater) {
    cartItems = await CartItemsModel.findOneAndUpdate(
      { cartItemId: cartItemId },
      { $set: { saveForLater: saveForLater } },
      { new: true }
    );
  }

  return cartItems;
};


module.exports = {
  addCartItems,
  addOrUpdateQuantity,
  addOrMoveSaveForLater,
};
