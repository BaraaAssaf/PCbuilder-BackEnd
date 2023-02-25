
  
const {  Joi  } = require('celebrate');

const orderSchema ={
    body: Joi.object().keys({
        visanumber: Joi.number().required(),
        security_code: Joi.number().required(),
        LocationDelivery: Joi.string().required(),
        TotalPrice: Joi.number().required(),
        user_id: Joi.number().required(),
    })
  }

  module.exports = { orderSchema};