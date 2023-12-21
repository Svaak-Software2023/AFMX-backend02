const ClientModel = require('../model/clientModel');
const ComplaintModel = require('../model/complaintModel');
const ComplaintRemarksModel = require('../model/complaintRemarksModel');


const createComplaintRemarks = async (complaintRemarksDetails) => {

    console.log("complaintRemarksDetails", complaintRemarksDetails);

    const {
        complaintId,
        adminId,
        complaintAssigneeId,
        remarks,
        remarksCreatedBy
    } = complaintRemarksDetails;

    const complaintIds = await ComplaintModel.findOne({ complaintId }).select("-_id complaintId");
    console.log("complaint", complaintIds);
    if(!complaintIds) {
        throw new Error("Complaint ids doesn't Match");
    }
    const clientIds = await ClientModel.findOne({ clientId: complaintAssigneeId, isActive: true })
    .select("-_id clientId isActive");
    console.log("client", clientIds);

    if(!clientIds) {
        throw new Error("Neither assignee exists nor is active");
    }
    let complaintRemarksCount = 0;
     complaintRemarksCount = await ComplaintRemarksModel.findOne().count();

    const complaintRemarksNewDetails = new ComplaintRemarksModel({
        complaintRemarksId: complaintRemarksCount + 1,
        complaintId,
        adminId,
        complaintAssigneeId,
        remarks,
        remarksCreatedBy
    })
    const complaintRemarksCreateDetails = await complaintRemarksNewDetails.save();
    return complaintRemarksCreateDetails;

}


module.exports = {
    createComplaintRemarks,
}