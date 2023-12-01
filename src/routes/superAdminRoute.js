const express = require('express');
const admin_route = express.Router();

const admin_controller = require('../controller/superAdminController');
const { verifyToken } = require('../middleware/auth');

admin_route.post('/admin-login', admin_controller.loginAdmin);

// For testing purposes only
admin_route.get('/test',verifyToken, function(req, res) {
    res.status(403).json({ message: "Authenticated successfully"})
});

// Update password for admin
admin_route.post('/change-password', verifyToken, admin_controller.changePassowrd);


module.exports = admin_route;