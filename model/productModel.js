
const {  Joi  } = require('celebrate');

const productSchema ={
    body: Joi.object().keys({
      Productname: Joi.string().required(),
      CostPrice: Joi.number().required(),
      SellingPrice: Joi.number().required(),
      Details: Joi.string().required(),
      Quntity: Joi.number().required(),
    })
  }

  module.exports = { productSchema};