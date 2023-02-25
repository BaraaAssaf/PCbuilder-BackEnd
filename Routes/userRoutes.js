const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/controllerAuth');
const { celebrate, Joi} = require('celebrate');
const userModel = require('../model/userModel');
const multer = require("multer");

const storage = multer.diskStorage(
  { dest: "uploads/"  ,
  filename (req, file, cb) {
      cb(null, file.originalname);
  }
})
const upload = multer({storage});


const router = express.Router();




//User Router
router.get('/',  userController.getAllUser);
router.get('/:id' ,  userController.getUserbyID);
router.put('/:id' , celebrate(userModel.updateSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/upload/:id', upload.single("image") , userController.uploadimage);

//Auth Router
router.post('/change',authController.changePassword);

router.post('/sginup', celebrate(userModel.sginUpSchema) ,authController.signup_post);
router.post('/login', celebrate(userModel.loginSchema),authController.login);
router.post('/Verfiy',authController.Verfiy);

router.post('/resend',authController.ResendVerificationCode);

module.exports = router;