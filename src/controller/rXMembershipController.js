const rXMembershipService = require("../services/rXMembershipService")

const createMembershipSubscription = async (req, res) => {
    try {
        const loggedInUser = req.decoded;
        // Handle the create rx memeber ship subscription response
        const membershipSubscription = await rXMembershipService.createMembershipSubscription(
            req.body,
            loggedInUser
        );

        return res.status(201).json({
            message: "Membership Subscription Created !",
            membershipSubscription,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createMembershipSubscription,
}