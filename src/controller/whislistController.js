const whislistService = require("../services/whislistService");

const addToWhislist = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    const whislistResponse = await whislistService.addToWhislist(
      loggedInUser,  
      req.body
    );
    return res
      .status(201)
      .json({ message: "Added to Whislist", whislistResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const getAllWhislist = async(req, res) => {
  try {
    const loggedInUser = req.decoded;
    const whislistResponse = await whislistService.getAllWhislist(
      loggedInUser
    );
    return res
   .status(200)
   .json({ message: "All whislist retrieved successfully", whislistResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
    addToWhislist,
    getAllWhislist
}