const ProductDeliveryAddressModel = require('../model/productDeliveryAddress');
const ClientModel = require('../model/clientModel');
const CartModel = require('../model/cartModel');
const { errorMsg } = require('../const/errorHelper');


const createProductDeliveryAddress = async(deliveryAddressDetails) => {
    const {
        cartId,
        clientId,
        clientPhone,
        clientAddress1,
        clientAddress2,
        clientCity,
        clientState,
        clientCountry,
        clientPostalCode
    } = deliveryAddressDetails;

    const Cart = await CartModel.findOne({ cartId });
    if(!Cart) throw new Error(errorMsg.CART_ID_NOT_VALID);

    // Check if the client exists
  const client = await ClientModel.findOne({ clientId });

    if(!client) throw new Error(errorMsg.CLIENT_NOT_FOUND);

    if(!client.isActive) throw new Error(errorMsg.INACTIVE_CLIENT_ADDRESS_ERROR);



    // Fetch count of Product delivery address
    const productDeliveryAddressCount = await ProductDeliveryAddressModel.countDocuments();
        const deliveryAddressData = new ProductDeliveryAddressModel({
            deliveryAddressId: productDeliveryAddressCount + 1,
            cartId,
            clientId,
            clientPhone,
            clientAddress1,
            clientAddress2,
            clientCity,
            clientState,
            clientCountry,
            clientPostalCode
    });

    const newProductDeliveryAddress = deliveryAddressData.save();

    return newProductDeliveryAddress;
}

// const updateProductDeliveryAddress = async()

const updateProductDeliveryAddress = async (deliveryAddressId, updatedDeliveryAddressDetails) => {
    const productDeliveryAddressData = 
        await ProductDeliveryAddressModel.findOne({ deliveryAddressId: deliveryAddressId });
  
    //Check existing join data
    if (!productDeliveryAddressData) {
      throw new Error(errorMsg.PRODUCT_DELIVERY_ADDRESS_NOT_FOUND_ERROR);
    }
  
    const updatedDeliveryAddress = await ProductDeliveryAddressModel.findOneAndUpdate(
      { deliveryAddressId },
      { $set: updatedDeliveryAddressDetails },
      { new: true }
    );
    return updatedDeliveryAddress;
};

// Get API's for single data
const getSingleCreateProductDeliveryAddress = async (deliveryAddressSingleDetails) => {
    const { deliveryAddressId } = deliveryAddressSingleDetails;
  
    // Check existing department
    const deliveryAddressData = await ProductDeliveryAddressModel.findOne({ deliveryAddressId });
  
    if (!deliveryAddressData) {
      throw new Error(errorMsg.FETCH_USERS_ID_MISSING_ERROR);
    }
    return deliveryAddressData;
  };


const getAllCreateProductDeliveryAddress = async () => {
    const productDeliveryAddressData = await ProductDeliveryAddressModel.find({});
  
    if (!productDeliveryAddressData) {
      throw new Error(errorMsg.FETCH_USERS_FAILED);
    }
    return productDeliveryAddressData;
};


module.exports = {
    createProductDeliveryAddress,
    updateProductDeliveryAddress,
    getAllCreateProductDeliveryAddress,
    getSingleCreateProductDeliveryAddress
}