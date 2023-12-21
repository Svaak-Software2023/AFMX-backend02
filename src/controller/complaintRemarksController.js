const complaintRemarksService = require('../services/complaintRemarksService');

const createComplaintRemarks = async (req, res) => {
    try {
        const complaintRemarks = await complaintRemarksService.createComplaintRemarks(req.body);
        return res.status(201).json({ message: "Remarks Created", complaintRemarks });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createComplaintRemarks
}