const express = require('express');
const controllerTestimonial = require('../controller/controllerTestimonial');
const {celebrate} = require('celebrate');
const testimonialModel = require('../model/testimonialModel');
const router = express.Router();

//order Router
router.get('/',  controllerTestimonial.getAllTestimonial);
router.get('/show',  controllerTestimonial.getshowTestimonial);

router.post('/',celebrate(testimonialModel.testimonialSchema) ,controllerTestimonial.createTestimonial);

router.put('/:id' ,  controllerTestimonial.updateTestimonial);

module.exports = router;