const express = require('express')
const route = express.Router();

const userPaymentController = require('../controller/user.payment');


route.post('/create_customer', userPaymentController.createCustomer);
route.post('/add_card', userPaymentController.addCard);
route.post('/create_charges', userPaymentController.createCharges);

module.exports = route;