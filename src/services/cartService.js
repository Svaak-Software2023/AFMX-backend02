const { errorMsg } = require("../const/errorHelper");
const CartModel = require("../model/cartModel");
const ClientModel = require('../model/clientModel');

const cartAdd = async (cartDetails) => {
  const { clientId, deliveryCharges, discountPrice } = cartDetails;

  // Check if the client exists
  const client = await ClientModel.findOne({ clientId });
  console.log('client', client);
  // console.log('client', client.clientId);


  if (!client) {
    throw new Error(errorMsg.CLIENT_NOT_FOUND);
  }

  if (!client.isActive) {
    throw new Error(errorMsg.INACTIVE_CLIENT_CART_ERROR);
  }

    //Fetch count of cart
    const cartCount = await CartModel.countDocuments();
    const cartData = new CartModel({
        clientId,
        cartId: cartCount + 1,
        deliveryCharges,
        discountPrice
    });
    
    const cartNewData = await cartData.save();
    return cartNewData;
};  

module.exports = {
  cartAdd,
};
