const { errorMsg } = require('../const/errorHelper');
const CartItemsModel = require('../model/cartItemsModel');
const CartModel = require('../model/cartModel');
const ProductModel = require('../model/productModel');


const addCartItems = async(cartItemsDetails) => {
    const {
        cartId,
        productId,
        noOfProducts,
        productPrice,
        
    } = cartItemsDetails;

    const Cart = await CartModel.findOne({ cartId }).select('-_id cartId');

    if(!Cart) throw new Error(errorMsg.CART_ID_NOT_VALID);

    const product = await ProductModel.findOne({ productId }).select('-_id productId productPrice');
    if(!product) throw new Error(errorMsg.PRODUCT_ID_INVALID);

    // if(!product.isActive) throw new Error("product id is not active");

    if(product.productPrice !== productPrice) throw new Error(errorMsg.PRODUCT_PRICE_INVALID) 

    // Fetch count of cart items
    const cartItemCount = await CartItemsModel.countDocuments();

    const cartItemsData = new CartItemsModel({
        cartItemId: cartItemCount + 1,
        cartId,
        productId,
        noOfProducts,
        productPrice
    });

    const newCartItemsDetails = await cartItemsData.save();
    return newCartItemsDetails;
}

module.exports = {
    addCartItems,
}