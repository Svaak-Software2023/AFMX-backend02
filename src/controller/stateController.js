const stateService = require("../services/stateService");

const registerState = async (req, res) => {
  try {
    //Creating a new State.
    const registerNewState = await stateService.registerState(req.body);

    return res.status(201).json({ message: "State created", registerNewState });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update country
const updateState = async (req, res) => {
  try {
    // Handle updated country response.
    const stateUpdatedResponse = await stateService.updateState(
      req.params.stateId,
      req.body
    );

    return res
      .status(202)
      .json({ message: "State updated", stateUpdatedResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllRegistersState = async (req, res) => {
  try {
    const getResponse = await stateService.getAllRegistersState();
    return res.json({
      message: "Fetch all state register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerState,
  updateState,
  getAllRegistersState,
};
