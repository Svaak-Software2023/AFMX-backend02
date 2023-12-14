const complaintCategoryService = require("../services/complaintCategoryService");

//Create ComplaintCategory
const createComplaintCategory = async (req, res) => {
  try {
    // Handle create complaintCategory response.
    const complaintCategoryResponse =
      await complaintCategoryService.createComplaintCategory(req.body);
    return res.status(201).json({
      message: "Complaint Category created successfully",
      complaintCategoryResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update ComplaintCategory
const updateComplaintCategory = async (req, res) => {
  try {
    // Handle updated complaintCategory response.
    const complaintCategoryUpdatedResponse =
      await complaintCategoryService.updateComplaintCategory(
        req.params.complaintCategoryId,
        req.body
      );

    return res.status(202).json({
      message: "Complaint Category updated successfully.",
      complaintCategoryUpdatedResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Delete ComplaintCategory
const deleteComplaintCategory = async (req, res) => {
  try {
    // Handle the delete Complaint Category response based on complaintCategoryId
    const complaintCategoryDeleteResponse =
      await complaintCategoryService.deleteComplaintCategory(
        req.params.complaintCategoryId,
        req.body
      );
    console.log(
      "req.params.complaintCategoryId",
      req.params.complaintCategoryId,
      req.body
    );
    return res.json({
      message: "Complaint Category de-activated",
      complaintCategoryDeleteResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAllComplaintCategory = async (req, res) => {
  try {
    const getResponse = await complaintCategoryService.getAllComplaintCategory();
    return res.json({
      message: "Fetch all complaint category details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createComplaintCategory,
  updateComplaintCategory,
  deleteComplaintCategory,
  getAllComplaintCategory
};
