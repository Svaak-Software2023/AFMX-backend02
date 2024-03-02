const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productCategorySchema = new Schema({
    productCategoryId: {
        type: Number,
        required: true
    },
	productCategoryName: {
        type: String,
        required: true
    },
	productCategoryDescription: {
        type: String,
        required: true
    },
	createdDate: {
        type: Date,
        default: Date.now
    },
	updatedDate: {
        type: Date,
        default: Date.now
    },
	isActive: {
        type: Boolean,
        default: true
    }
});

const ProductCategoryModel = mongoose.model("productcategory", productCategorySchema);

module.exports = ProductCategoryModel;