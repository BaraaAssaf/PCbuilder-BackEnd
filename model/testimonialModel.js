
    
const {  Joi  } = require('celebrate');

const testimonialSchema ={
    body: Joi.object().keys({
        Message: Joi.string().required(),
        userid:Joi.number().required()
    })
}

  module.exports = { testimonialSchema};