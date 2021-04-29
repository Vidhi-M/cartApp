const cartModel = require('../model/cart');
const orderModel = require('../model/order');
const session = require('express-session');
//const productModel = require('../model/products')

exports.viewAll = async(req,res)=>{
    try{
        const allCarts = await cartModel.find();
        console.log(allCarts);
        res.status(201).send(allCarts);
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
} 

exports.viewByUsername = async(req,res)=>{
    try{
        const username = req.session.username;
        const cart = await cartModel.findOne({username: username});
        res.status(201).send(cart);
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

 exports.create = async(req,res)=>{
    try{
       const username = req.session.user.username;
       console.log(username);
       const productsInCart = JSON.stringify(req.body.productsInCart);
       //const productId = req.param.productId;
       //const quantity = req.body.quantity;


       const cart = await cartModel.create
       ({username:username , productsInCart: productsInCart});
       res.status(201).json({
           status:'success',
           message :'cart created',
           data :cart,
       })

         


    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}


exports.update = async(req,res)=>{
    try{
        const username = req.session.username;
        console.log(username);
        const productsInCart = req.body.productsInCart;

        const cart = await cartModel.findOneAndUpdate({username:username,productsInCart:productsInCart});
        res.status(201).json({
            status:'success',
            message :'updated',
            data:cart,
        })
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}

exports.delete = async(req,res)=>{
    try{

        const prodname = await productModel.findOne({productId:req.param.productId});
        const sesUser = req.session;
        const deleted = await productModel.findOneAndDelete({productId: req.param.productId});
        res.status(200).json({
            message :' Deleted',
            data : deleted, 
        })

    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
} 

