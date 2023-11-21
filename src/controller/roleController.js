const roleService = require("../services/roleService");

//Create role
const createRole = async (req, res) => {
  try {
    // Handle create role response.
    const roleResponse = await roleService.createRole(req.body);
    return res.status(201).json({
      message: "Role created successfully",
      roleResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Update role
const updateRole = async (req, res) => {
  try {
    // Handle updated role response.
    const roleUpdatedResponse = await roleService.updateRole(
      req.params.roleId,
      req.body
    );

    return res.status(202).json({
      message: "Role updated successfully.",
      roleUpdatedResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

//Delete role
const deleteRole = async (req, res) => {
  try {
    // Handle the delete Complaint Status response based on roleId
    const roleDeleteResponse = await roleService.deleteRole(
      req.params.roleId,
      req.body
    );
    console.log("req.params.roleId", req.params.roleId, req.body);
    return res.json({
      message: "Role de-activated",
      roleDeleteResponse,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRole,
  updateRole,
  deleteRole,
};
