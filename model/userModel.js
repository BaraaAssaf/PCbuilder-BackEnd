
const {  Joi  } = require('celebrate');


let sginUpSchema ={
  body: Joi.object().keys({
    FirstName: Joi.string().required(),
    LastName: Joi.string().required(),
    Email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    Phone: Joi.string().required().min(10),
    Address: Joi.string().min(2).max(30),
    confirmpassword:Joi.ref('password')
  }),
}

  const loginSchema ={
    body: Joi.object().keys({
      Email: Joi.string().required().email(),
      password: Joi.string().required().min(4),
    })
  } 

  const updateSchema ={
    body: Joi.object().keys({
      FirstName: Joi.string().required(),
      LastName: Joi.string().required(),
      Email: Joi.string().required().email(),
      Phone: Joi.string().required().min(10),
      Address: Joi.string().required(),
    })
  }


  module.exports = {
    updateSchema ,
    loginSchema ,
    sginUpSchema , 

  }

