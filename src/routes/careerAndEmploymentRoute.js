const express = require('express');

const career_route = express.Router();

career_route.use(express.static('public'))

// Passing the json incoming request
career_route.use(express.json());
career_route.use(express.urlencoded({ extended: true }));

const fileUploadMiddleware = require('../middleware/multer');

const career_controller = require('../controller/careerAndEmploymentController');

career_route.post('/create-career', fileUploadMiddleware.single('resume'), career_controller.createtFormForCareer);

module.exports = career_route;