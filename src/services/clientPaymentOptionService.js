const ClientPaymentOptionModel = require("../model/clientPaymentOptionModel");
const ClientModel = require("../model/clientModel");
const { errorMsg } = require("../const/errorHelper");

const createPaymentOption = async (clientId, paymentOption) => {
  try {
    // Check if the client exists
    const client = await ClientModel.findOne({ clientId }).select('-_id clientId isActive');
    console.log("client", client);

    if (!client) throw new Error(errorMsg.CLIENT_NOT_FOUND);

    if(!client.isActive) throw new Error(errorMsg.INACTIVE_CLIENT_PAYMENT_ERROR)

    // Fetch count of payment option
    const paymentOptionIdCount =
      await ClientPaymentOptionModel.countDocuments();
      
    const newPaymentOption = new ClientPaymentOptionModel({
      paymentOptionId: paymentOptionIdCount + 1,
      clientId,
      paymentOption,
    });

    const savedPaymentOption = await newPaymentOption.save();
    return savedPaymentOption;
  } catch (error) {
    throw new Error(`Failed to create payment option: ${error.message}`);
  }
};

module.exports = {
  createPaymentOption,
};
