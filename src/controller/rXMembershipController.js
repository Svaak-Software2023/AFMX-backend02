const { response } = require("express");
const rXMembershipService = require("../services/rXMembershipService")

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
}


const handleSuccessUrl = async (req, res) => {
    try {
        const sessionId = req.query.session_id; // Retrieve the session ID from the query parameters
        // Handle the create rx memeber ship subscription response
        const handleSuccessUrlResponse = await rXMembershipService.handleSuccessUrl(
            sessionId
        );
        return res.status(200).json({
            message: "Membership Subscription Update Payment Status Successfully !",
            handleSuccessUrlResponse,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const getMembershipSubscription = async (req, res) => {
    try {
        const loggedInUser = req.decoded;
        // Handle the create rx memeber ship subscription response
        const getSubscriptionResponse = await rXMembershipService.getMembershipSubscription(
            res,
            loggedInUser
        );
        return res.status(200).json({
            message: "Membership Subscription Update Payment Status Successfully !",
            getSubscriptionResponse,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createMembershipSubscription,
    handleSuccessUrl,
    getMembershipSubscription
}