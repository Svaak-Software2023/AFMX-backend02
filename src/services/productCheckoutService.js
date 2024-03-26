const CartModel = require("../model/cartModel");
const CartItemsModel = require("../model/cartItemsModel");
const ProductCheckoutModel = require("../model/productCheckOutModel");
// const stripe = require('stripe')('sk_test_51OvvBkSCcnOJOCL2VesTfIkOS15UNTWxDTaCEa7iGO0sP3XsZf4T2yO1pflVC5SmDLBXatEaNZnj19Zp0qGNvwOy00vuqE8FoQ');
const stripe = require("stripe")(
  "sk_test_51Ow4TtJKdTIDd26gUcvvzGTGImrNv7JqE5jOWkbJgG6WweAHEFmSO1L0DHWPT3UP8mUpzc3LRyJKbUcOuEpmCk0E00ZS3VxDy3"
);

// Checkout Methods
const createProductCheckout = async (bodyData, paramsData, loggedInUser) => {
  console.log("logged in user", loggedInUser);

  const { cartId } = paramsData;

  const { products } = bodyData;
  console.log("products", products);

  // Check if the cart is associate with logged-in user
  const cart = await CartModel.findOne({
    clientId: loggedInUser.clientId,
    cartId: cartId,
  });
  console.log("cart ", cart);

  if (!cart) {
    throw new Error("There is no cart exists for this authenticated user");
  }

  const productIds = products.map((item) => item.productId);
  console.log("productIds", productIds);

  // Find the cart item based on the product id
  const cartItems = await CartItemsModel.find({
    cartId: cart.cartId,
    productId: { $in: productIds },
  });

  if (cartItems.length === 0) {
    throw new Error("No cart items");
  }

  const lineItems = products.map((product) => {
    const cartItem = cartItems.find(
      (item) => item.productId === product.productId
    );
    if (!cartItem) {
      throw new Error(`Cart item not found for product: ${product.productId}`);
    }  
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: product.productName,
          description: product.productDescription,
        },
        unit_amount: product.productPrice * 100, 
      },
      quantity: product.noofProducts,
    };
  });

  const finalPrice = Math.abs(cart.deliveryCharges - cart.discountPrice);

  // Calculate total price
  const totalPrice = lineItems.reduce(
    (total, item) => total + item.price_data.unit_amount * item.quantity,
    0
  ); 


   // Add delivery charges as a separate line item
   const deliveryChargesLineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Add Delivery Charges Amount After Discount",
      },
      unit_amount:  finalPrice * 100, // Assuming deliveryCharges is in cents
    },
    quantity: 1,
  };

   // Combine product line items with delivery charges
   const combinedLineItems = [...lineItems, deliveryChargesLineItem];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: combinedLineItems,
    mode: "payment",
    success_url: "https://americasfinestmaintenance.com/#/success",
    cancel_url: "https://americasfinestmaintenance.com/#/cancel",
  });

    // Find the largest existing productCheckoutId
    const maxProductCheckoutCount = await ProductCheckoutModel.findOne(
        {},
        { productCheckoutId: 1 },
        { sort: { productCheckoutId: -1 } }
      );
    
      // Calculate the next productCheckoutId
      const nextproductCheckoutId = maxProductCheckoutCount
        ? maxProductCheckoutCount.productCheckoutId + 1
        : 1;
    
     // Create a new instance of ProductCheckoutModel  
      const newProductCheckout = new ProductCheckoutModel({
        productCheckoutId: nextproductCheckoutId,
        cartId: cart.cartId,
        products: products,
        totalPrice:( totalPrice + finalPrice) / 100,
        payment_status: session.payment_status
    
      });

      // Save the new productCheckout
      // const savedProductCheckout = await newProductCheckout.save();
      // console.log("saved productCheckout", savedProductCheckout);



     return {sessionId: session.id }
  
};

module.exports = {
  createProductCheckout,
};
