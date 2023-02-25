const client = require('./connection.js');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const userRoutes = require('./Routes/userRoutes');
const cartRoutes = require('./Routes/cartRoutes');
const orderRoutes = require('./Routes/orderRoutes');
const productRoutes = require('./Routes/productRoutes');
const testimonialRoutes = require('./Routes/testimonialRouts');
const contactusRoutes = require('./Routes/contactusRoutes');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
var cors = require('cors');


const app = express();

client.connect().then(result => console.log("dpconnected"))
.catch(err => console.log(err));

// middleware 
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use(cookieParser());

//routes

app.use('/users' ,userRoutes);
app.use('/product' ,productRoutes);
app.use('/order' ,orderRoutes);
app.use('/cart' ,cartRoutes);
app.use('/testimonial' ,testimonialRoutes);
app.use('/contactus' ,contactusRoutes);

  app.use(errors()); 
  module.exports = app;