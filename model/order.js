const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema(
    {
    orderId:{
        type: Number,
        required : true,
    },
    orderAmount:{
        type : Number,
    },
    cartId:{
        type: Number,
        //required : true,
    }
    },
    {
        timestamps:{
            createdAt: true,
            updatedAt : true,
        },
});

module.exports = mongoose.model('Order',orderSchema);