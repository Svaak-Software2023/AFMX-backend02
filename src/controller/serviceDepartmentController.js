const serviceDepartmentService = require("../services/serviceDepartmentService");

// Create Department
const createServiceDepartment = async (req, res) => {
  try {
    // Handle deparment response
    const serviceDepartmentResponse = await serviceDepartmentService.createServiceDepartment(
      req.body
    );
    return res
      .status(201)
      .json({ message: "Service Department Created", serviceDepartmentResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update Department
const updateServiceDepartment = async (req, res) => {
  try {
    // Handle updated department response.
    const updatedServiceDepartmentResponse = await serviceDepartmentService.updateServiceDepartment(
      req.params.serviceDepartmentId,
      req.body
    );

    return res.status(202).json({
      message: "Service Department Updated.",
      updatedServiceDepartmentResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Single Department
const getSingleCreateServiceDepartment = async (req, res) => {
  try {
    // Handle the get department response
    const getSingleResponse =
      await serviceDepartmentService.getSingleCreateServiceDepartment(req.body);
    return res.json({
      message: "Fetch single service department create details successfully",
      getSingleResponse,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get All Department
const getAllCreateServiceDepartment = async (req, res) => {
  try {
    const getResponse = await serviceDepartmentService.getAllCreateServiceDepartment();
    return res.json({
      message: "Fetch all service department create details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createServiceDepartment,
  updateServiceDepartment,
  getAllCreateServiceDepartment,
  getSingleCreateServiceDepartment,
};
