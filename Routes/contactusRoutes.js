const express = require('express');
const controllerContactus = require('../controller/controllerContactus');
const {celebrate} = require('celebrate');
const contactusModel = require('../model/contactusModel');
const router = express.Router();

//order Router
router.get('/',  controllerContactus.getAllContactus);
router.post('/',celebrate(contactusModel.contactusSchema) ,controllerContactus.createContactus);
router.delete('/:id' ,  controllerContactus.deleteContactus);

module.exports = router;