const express = require('express');
const productRouter = express.Router();
const productController = require('../controller/productController');


productRouter.post('/create',productController.create);
productRouter.get('/tablets/:prodCode',productController.viewAlltab);
productRouter.get('/mobiles/:prodCode',productController.viewAllmob);

/* 
productRouter.all('*',invalid);
async function invalid(req,res){   // sends 404 back to user if any url is not found 
    res.status(404).json({
        message : 'Resource not found'
    })
}
 */
module.exports= productRouter;