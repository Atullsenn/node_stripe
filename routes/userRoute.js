const express = require('express');
const router = express.Router();

//controller

const userController = require('../controllers/userController')

router.post('/sendOtp', userController.sendOtp);


module.exports = router;