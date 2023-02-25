const express = require('express');
const cartController = require('../controller/controllerCart');
const cartModel = require('../model/cartModel');
const {celebrate} = require('celebrate');
const router = express.Router();

//Category Router
router.get('/count/:id',  cartController.cartCountByid);
router.get('/:id' ,  cartController.getCartbyID);
router.post('/', celebrate(cartModel.cartSchema),cartController.createCart);
router.put('/:id' ,  cartController.updateCart);

module.exports = router;