const complaintRemarksService = require('../services/complaintRemarksService');

const createComplaintRemarks = async (req, res) => {
    try {
        const complaintRemarks = await complaintRemarksService.createComplaintRemarks(req.body);
        res.status(201).send(complaintRemarks);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = {
    createComplaintRemarks
}