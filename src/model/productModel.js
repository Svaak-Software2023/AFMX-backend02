const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  productCategoryId: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: Array,
    required: true,
  },
  productBrand: {
    type: String,
    default: "",
  },
  containerType: {
    type: String,
    default: "",
  },
  containerSize: {
    type: String,
    default: "",
  },
  cleanerForm: {
    type: String,
    default: "",
  },
  readyToUseOrConcentrate: {
    type: Boolean,
    default: true,
  },
  fragrances: {
    type: String,
    default: "",
  },
  upcCode: {
    type: Number,
    default: "",
  },
  skuCode: {
    type: String,
    default: "",
  },
  productMRP: {
    type: Number,
    default: 0,
  },
  productPrice: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
  discount: {
    type: String,
    default: 0,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;
