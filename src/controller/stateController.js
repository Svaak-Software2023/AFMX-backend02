const stateService = require("../services/stateService");

const registerState = async (req, res) => {
  try { 
    //Creating a new State.
    const registerNewState = await stateService.registerState(
      req.body
    );

    return res
      .status(201)
      .json({ message: "State created", registerNewState });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllRegistersState = async (req, res) => {
  try {
    const getResponse = await stateService.getAllRegistersState();
    return res.json({ message: "Fetch all state register details successfully ", getResponse})
  } catch (error) {
    return res.status(500).json({ error: error.message })
    
  }
}

module.exports = {
    registerState,
    getAllRegistersState
};
