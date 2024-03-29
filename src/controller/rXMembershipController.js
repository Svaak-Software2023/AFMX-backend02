const { response } = require("express");
const rXMembershipService = require("../services/rXMembershipService");

const createMembershipSubscription = async (req, res) => {
  try {
    const loggedInUser = req.decoded;
    // Handle the create rx memeber ship subscription response
    await rXMembershipService.createMembershipSubscription(
      req.body,
      loggedInUser,
      res
    );
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createMembershipSubscription,
};
