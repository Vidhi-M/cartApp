const { create } = require('connect-mongo');
const productModel = require('../model/products');
//const productRouter = require('../routes/productRouter');

exports.create = async(req,res)=>{
    try{
        const createProduct = await productModel.create({
            productId: req.body.productId,
            productName : req.body.productName,
            productCode : req.body.productCode,
            description : req.body.description,
            price : req.body.price,
            manufacturer : req.body.manufacturer,
            osType : req.body.osType,
            rating : req.body.rating
        });
        res.status(201).send(`product created : ${createProduct}`);
          /*  json({
            status : 'success',
            message :'product created',
            data : createProduct, 
        })*/
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

exports.viewAlltab = async(req,res)=>{
    try{
        const productCode = req.body.productCode;
        const code = await productModel.find(productCode);
        res.status(201).json({
            status : 'success',
            message :'retrieved all',
            data : code,
        })
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

exports.viewAllmob = async(req,res)=>{
    try{
        const productCode = req.body.productCode;
        const code = await productModel.find(productCode);
        res.status(201).json({
            status : 'success',
            message :'retrieved all',
            data : code,
        })
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}