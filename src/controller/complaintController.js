const complaintService = require('../services/complaintService');

const createComplaintPortal = async (req, res) => {
    try {
        const complaintDetails = req.body;
        const loggedInIds = Number(req.query.id);
        console.log('Logging in', loggedInIds);
        const complaintResponse = await complaintService.createComplaintPortal(complaintDetails, loggedInIds);
       return res.status(200).json({
            message: "Complaint Created Successfully",
            complaintResponse
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    createComplaintPortal
}
