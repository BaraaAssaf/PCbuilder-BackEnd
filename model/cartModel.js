
const {  Joi  } = require('celebrate');

const cartSchema ={
    body: Joi.object().keys({
        userid: Joi.number().required(),
        productid: Joi.number().required(),
        quntity: Joi.number().required()
    
    })
}

module.exports = { cartSchema};