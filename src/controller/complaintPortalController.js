const complaintPortalService = require('../services/complaintPortalService');

const addComplaintPortal = async (req, res) => {
    try {
        const complaintPortalDetails = req.body;
        const complaintPortalData = await complaintPortalService.addComplaintPortal(complaintPortalDetails,  req.files);
        res.status(200).json({ message: "ComplaintPortal added successfully",complaintPortalData})
    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    addComplaintPortal
}