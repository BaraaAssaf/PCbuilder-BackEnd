
const {  Joi  } = require('celebrate');

const contactusSchema ={
    body: Joi.object().keys({
       Name: Joi.string().required(),
       Subject: Joi.string().required(),
       Email: Joi.string().required().email(),
       Message: Joi.string().required(),
    })
}

  module.exports = { contactusSchema};