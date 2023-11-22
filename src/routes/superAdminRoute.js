const express = require('express');
const admin_route = express.Router();

const admin_controller = require('../controller/superAdminController');

admin_route.post('/admin-login', admin_controller.loginAdmin);

admin_route.post('/change-password', admin_controller.changePassowrd);

module.exports = admin_route;