const complaintService = require('../services/complaintService');

const existingComplaintPortal = async (req, res) => {
    try {

        const complaintDetail = req.body;
        const files = req.files;

        // Assuming you're expecting a file named 'evidencePicture'
        const evidencePicture = files && files.evidencePicture ? files.evidencePicture[0].filename : null;
        const evidenceVideo = files && files.evidenceVideo ? files.evidenceVideo[0].filename : null;

        const complaintResponse = await complaintService.existingComplaintPortal(complaintDetail,
            evidencePicture,
            evidenceVideo
        );
        return res.status(200).json({
            message: "Complaint Created Successfully",
            complaintResponse
        });
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
}

const nonExistingComplaintPortal = async (req, res) => {
    try {

        const complaintDetail = req.body;
        const files = req.files;

        // Assuming you're expecting a file named 'complaintImage'
        const evidencePicture = files && files.evidencePicture ? files.evidencePicture[0].filename : null;
        const evidenceVideo = files && files.evidenceVideo ? files.evidenceVideo[0].filename : null;

        const complaintResponse = await complaintService.nonExistingComplaintPortal(complaintDetail,
            evidencePicture,
            evidenceVideo
        );
        return res.status(200).json({
            message: "Complaint Created Successfully For Non Existing",
            complaintResponse
        });
    } catch (error) {
        console.log("error: ", error);
        return res.status(500).json({
            error: error.message
        });
    }
}

const updateExistingComplaint = async (req, res) => {
    try {
        const { complaintId } = req.params;
        const updateComplaintResponse = await complaintService.updateExistingComplaint(complaintId, req.body);
        return res.status(201).json({ message: "Complaint updated successfully", updateComplaintResponse}) 
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}


const getAllCreateComplaintPortalService = async (req, res) => {
    try {
        const { complaineeId } = req.params;
        const getResponse = await complaintService.getAllCreateComplaintPortalService(complaineeId);
        return res.json({
            message: "Fetch all create complaint portal service details successfully ",
            getResponse,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    existingComplaintPortal,
    nonExistingComplaintPortal,
    getAllCreateComplaintPortalService,
    updateExistingComplaint
}
