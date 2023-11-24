const cityService = require("../services/cityService");

const registerCity = async (req, res) => {
  try {
    // Handle the city response.
    const cityResponse = await cityService.registerCity(req.body);

    return res.status(201).json({ message: "City created", cityResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update country
const updateCity = async (req, res) => {
  try {
    // Handle updated country response.
    const cityUpdatedResponse = await cityService.updateCity(
      req.params.cityId,
      req.body
    );

    return res
      .status(202)
      .json({ message: "City updated", cityUpdatedResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllRegistersCity = async (req, res) => {
  try {
    const getResponse = await cityService.getAllRegistersCity();
    return res.json({
      message: "Fetch all city register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerCity,
  updateCity,
  getAllRegistersCity,
};
