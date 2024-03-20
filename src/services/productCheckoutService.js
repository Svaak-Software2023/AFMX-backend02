const CartModel = require('../model/cartModel');
const CartItemsModel = require('../model/cartItemsModel');
// const stripe = require('stripe')('sk_test_51OvvBkSCcnOJOCL2VesTfIkOS15UNTWxDTaCEa7iGO0sP3XsZf4T2yO1pflVC5SmDLBXatEaNZnj19Zp0qGNvwOy00vuqE8FoQ');
const stripe = require("stripe")("sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3");


// Checkout Methods
const createProductCheckout = async(bodyData, paramsData, loggedInUser) => { 
    console.log("logged in user", loggedInUser);  
    
    const { cartId } = paramsData;

    const { productId, noofProducts, productPrice, productName } = bodyData;    
    console.log("bodyData", bodyData);

    // Check if the cart is associate with logged-in user
    const cart = await CartModel.findOne({
        clientId: loggedInUser.clientId,
        cartId: cartId,
    });
    console.log("cart ", cart);

    if(!cart) {
        throw new Error("There is no cart exists for this authenticated user");
    }

    const items = bodyData.map(item => item.productId);
    console.log("itmes", items);

    // Find the cart item based on the product id
    const cartItems = await CartItemsModel.find({
        cartId: cart.cartId,
        productId: items,
    });

    console.log("cartItems", cartItems);

    const line_items = bodyData.map((lineItem) => {
        return {
            price_data: {
                currency: "inr",
                product_data: {
                    name: lineItem.productName,
                },
                unit_amount: lineItem.productPrice * 100,
            },
            quantity: lineItem.noofProducts,
        };
    })

   const session = await stripe.checkout.sessions.create({
     payment_method_types: ["card"],
     line_items: line_items,
     mode: "payment",
     success_url: "http://localhost:5173/success",
     cancel_url: "http://localhost:5173/cancel",
   })
   console.log("session", session);
   return session;
};

module.exports = {
    createProductCheckout,
}