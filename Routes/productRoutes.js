const express = require('express');
const router = express.Router();
const {celebrate} = require('celebrate');
const productModel = require('../model/productModel');

const productController = require('../controller/controllerproduct');
const multer = require("multer");

const storage = multer.diskStorage(
  { dest: "uploads/"  ,
  filename (req, file, cb) {
      cb(null, file.originalname);
  }
})

const upload = multer({storage});




//product Router
router.get('/',  productController.getAllProduct);
router.post('/',  celebrate(productModel.productSchema),productController.createProduct);
router.put('/:id' , celebrate(productModel.productSchema) ,productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

router.post('/upload/:id', upload.single("image") , productController.uploadimage);

module.exports = router;