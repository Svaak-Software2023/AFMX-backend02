const ClientPaymentOptionModel = require("../model/clientPaymentOptionModel");
const ClientModel = require("../model/clientModel");

const createPaymentOption = async (clientId, paymentOption) => {
  try {
    // Check if the client exists
    const client = await ClientModel.findOne({ clientId }).select('-_id clientId isActive');
    console.log("client", client);

    if (!client) throw new Error("Client with the provided ID does not exist");

    if(!client.isActive) throw new Error("Your clientId is not active, unable to proceed payment")

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
