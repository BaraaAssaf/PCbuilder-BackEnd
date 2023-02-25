const express = require('express');
const orderController = require('../controller/controllerOrder');
const {celebrate} = require('celebrate')
const orderModel = require('../model/orderModel')
const router = express.Router();

//order Router
router.get('/',  orderController.getAllOrder);
router.get('/report',  orderController.report);
router.get('/statistics',  orderController.statistics);


router.get('/:id' ,  orderController.getOrderbyID);

router.post('/confirm',celebrate(orderModel.orderSchema) ,orderController.confirmOrder);
router.put('/:id' ,  orderController.updateOrder);

module.exports = router;




