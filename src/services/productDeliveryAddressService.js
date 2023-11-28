const ProductDeliveryAddressModel = require('../model/productDeliveryAddress');
const ClientModel = require('../model/clientModel');
const CartModel = require('../model/cartModel');


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

    console.log("cart", Cart);
    if(!Cart) throw new Error("cart id is not valid");

    // Check if the client exists
  const client = await ClientModel.findOne({ clientId });
  console.log('client', client);
//   console.log('client', client.clientId);
    if(!client) throw new Error("Client with the provided ID does not exist");

    if(!client.isActive) throw new Error("Your clientId is not active, unable to add the Address");



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
      throw new Error(" Product Delivery Address is not found");
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
      throw new Error("Could not fetch address, Id is missing");
    }
    return deliveryAddressData;
  };


const getAllCreateProductDeliveryAddress = async () => {
    const productDeliveryAddressData = await ProductDeliveryAddressModel.find({});
  
    if (!productDeliveryAddressData) {
      throw new Error("Could not fetch data");
    }
    return productDeliveryAddressData;
};


module.exports = {
    createProductDeliveryAddress,
    updateProductDeliveryAddress,
    getAllCreateProductDeliveryAddress,
    getSingleCreateProductDeliveryAddress
}