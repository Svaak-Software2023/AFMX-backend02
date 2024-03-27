const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productCheckoutSchema = new Schema(
  {
    productCheckoutId: {
      type: Number,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    payment_method_types: {
      type: Array,
      required: true,
    },
    cartId: {
      type: Schema.Types.Number,
      ref: "Cart",
      required: true,
    },
    products: [
      {
        productId: {
          type: Schema.Types.Number,
          ref: "Product",
          required: true,
        },
        noofProducts: {
          type: Number,
          required: true,
        },
        productPrice: {
          type: Number,
          required: true,
        },
        productName: {
            type: String,
            required: true,
        }
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    payment_status: {
        type: String,
        required: true,
    }
  },
  { timestamps: true }
);

const ProductCheckoutModel = mongoose.model(
  "ProductCheckout",
  productCheckoutSchema
);

module.exports = ProductCheckoutModel;
