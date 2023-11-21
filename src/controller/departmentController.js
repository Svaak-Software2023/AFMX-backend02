const departmentService = require("../services/departmentService");

// Create Department
const registerDeparment = async (req, res) => {
  try {
    // Handle deparment response
    const departmentResponse = await departmentService.registerDeparment(
      req.body
    );
    return res
      .status(201)
      .json({ message: "Department Created", departmentResponse });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update Department
const updateDepartment = async (req, res) => {
  try {
    // Handle updated department response.
    const departmentUpdatedResponse = await departmentService.updateDepartment(
      req.params.departmentId,
      req.body
    );

    return res.status(202).json({
      message: "Department Updated.",
      departmentUpdatedResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get Single Department
const getSingleRegistersDepartment = async (req, res) => {
  try {
    // Handle the get department response
    const getSingleResponse =
      await departmentService.getSingleRegistersDepartment(req.body);
    return res.json({
      message: "Fetch single department register details successfully",
      getSingleResponse,
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// Get All Department
const getAllRegistersDepartment = async (req, res) => {
  try {
    const getResponse = await departmentService.getAllRegistersDepartment();
    return res.json({
      message: "Fetch all department register details successfully ",
      getResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerDeparment,
  updateDepartment,
  getAllRegistersDepartment,
  getSingleRegistersDepartment,
};
