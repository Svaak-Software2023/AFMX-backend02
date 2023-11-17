const complaintStatusService = require("../services/complaintStatusService");

//Create ComplaintStatus
const createComplaintStatus = async (req, res) => {
  try {
    // Handle create complaintStatus response.
    const complaintStatusResponse =
      await complaintStatusService.createComplaintStatus(req.body);
    return res
      .status(201)
      .json({
        message: "Complaint Status created successfully",
        complaintStatusResponse,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update ComplaintStatus
const updateComplaintStatus = async (req, res) => {
  try {
    // Handle updated complaintStatus response.
    const complaintStatusUpdatedResponse =
      await complaintStatusService.updateComplaintStatus(
        req.params.complaintStatusId,
        req.body
      );
    
      return res.status(202).json({
        message: "Complaint Status updated successfully.",
        complaintStatusUpdatedResponse,
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Delete ComplaintStatus
const deleteComplaintStatus = async (req, res) => {
  try {
    // Handle the delete Complaint Status response based on complaintStatusId
    const complaintStatusDeleteResponse =
      await complaintStatusService.deleteComplaintStatus(
        req.params.complaintStatusId,
        req.body
      );
      console.log("req.params.complaintStatusId", req.params.complaintStatusId, req.body);
    return res.json({
      message: "Complaint Status de-activated",
      complaintStatusDeleteResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComplaintStatus,
  updateComplaintStatus,
  deleteComplaintStatus,
};
