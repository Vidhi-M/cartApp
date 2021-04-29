const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controller/orderController');

orderRouter.post('./orders/:username',orderController.createOrder);

/* orderRouter.all('*',invalid);
async function invalid(req,res){   // sends 404 back to user if any url is not found 
    res.status(404).json({
        message : 'Resource not found'
    })
} */

module.exports= orderRouter;