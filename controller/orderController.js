const orderModel = require('../model/order');
const cartModel = require('../model/cart');


exports.createOrder = async(req,res)=>{
    try{
        const username = req.session.username;
        const orderAmount = req.body.orderAmount;
        const cartId = req.body.cartId;
        const order = await orderModel({username : username , orderAmount:orderAmount,cartId:cartId})
        res.status(201).json({
            message :'Order craeted and cart is closed',
            data : order,
        })
    }catch(err){
        console.log(err);
        res.status(500).send('An error occured');
    }
}