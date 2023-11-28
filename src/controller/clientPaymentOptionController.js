const ClientPaymentOptionService = require("../services/clientPaymentOptionService");

const createPaymentOption = async (req, res) => {
  const { clientId, paymentOption } = req.body;

  try {
    // Handle the payment option response
    const savedPaymentOption =
      await ClientPaymentOptionService.createPaymentOption(
        clientId,
        paymentOption
      );
    return res.json({
      message: "Payment option created",
      paymentOption: savedPaymentOption,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPaymentOption,
};
