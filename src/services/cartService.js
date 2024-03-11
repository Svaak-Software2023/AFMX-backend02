const { errorMsg } = require("../const/errorHelper");
const CartItemsModel = require("../model/cartItemsModel");
const cartModel = require("../model/cartModel");
const CartModel = require("../model/cartModel");
const ClientModel = require("../model/clientModel");


// Create Cart
const cartAdd = async (cartDetails, loggedInUser) => {
  const {
    clientId: requestedClientId,
    deliveryCharges,
    discountPrice,
  } = cartDetails;
console.log("logged in user", loggedInUser);
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


// Get the cart
// const getCart = async (loggedInUser) => {

// const cartAggregate = await CartModel.aggregate([
//         {
//           $match: {
//             clientId: loggedInUser.clientId,
//           },
//         },
//         {
//           $lookup: {
//             from: "cartitems",
//             localField: "cartId",
//             foreignField: "cartId",
//             as: "Items",
//           },
//         },
//         {
//           $lookup: {
//             from: "products",
//             localField: "Items.productId",
//             foreignField: "productId",
//             as: "Products"
//           },
//         },
//         {
//           $addFields: {
//             "Items.noOfProducts": { $arrayElemAt: ["$Items.noOfProducts", 0] }
//           }
//         },
//   ])

//   if(!cartAggregate || cartAggregate.length === 0) {
//     throw new Error("Cart is empty");
//   }
//   return cartAggregate[0];
// }

const getCart = async (loggedInUser) => {
  const cartAggregate = await CartModel.aggregate([
    {
      $match: {
        clientId: loggedInUser.clientId,
      },
    },
    {
      $lookup: {
        from: "cartitems",
        localField: "cartId",
        foreignField: "cartId",
        as: "Items",
      },
    },
    {
      $lookup: {
        from: "products",
        localField: "Items.productId",
        foreignField: "productId",
        as: "Products"
      },
    },
    {
      $addFields: {
        "Products": {
          $map: {
            input: "$Products",
            as: "product",
            in: {
              $mergeObjects: [
                "$$product",
                {
                  "noOfProducts": {
                    $arrayElemAt: [
                      "$Items.noOfProducts",
                      { $indexOfArray: ["$Items.productId", "$$product.productId"] }
                    ]
                  }
                }
              ]
            }
          }
        }
      }
    },
    // {
    //   $project: {
    //     Items: 0 // Exclude Items array from the result
    //   }
    // }
  ]);

  if (!cartAggregate || cartAggregate.length === 0) {
    throw new Error("Cart is empty");
  }

  return cartAggregate[0];
}



// Remove the item from the cart
const removeItemFromCart = async(paramsData, loggedInUser) => {
  const { cartItemId } = paramsData;

  // Find the cart associated with the logged-in user
  const cart = await CartModel.findOne({clientId: loggedInUser.clientId});
  if(!cart) {
    throw new Error("Cart does not exists");
  }

  // Find the cart item to remove
  const cartItems = await CartItemsModel.findOne({cartId: cart.cartId, cartItemId: cartItemId});
  console.log("cartItems", cartItems);
  if(!cartItems) {
    throw new Error("Cart item does not exists");
  }

  // Remove the cart item
  const deletedCartItems = await CartItemsModel.findOneAndDelete({ cartItemId: cartItems.cartItemId });
  if(!deletedCartItems) {
    throw new Error("Failed to delete cart item");
  }
  
  return deletedCartItems;
}

module.exports = {
  cartAdd,
  getCart,
  removeItemFromCart
};
