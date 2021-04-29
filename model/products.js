const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');


const connection = mongoose.connection;
autoIncrement.initialize(connection);

const productSchema = new Schema(
    {
   /* productId:{
        type: Number,
        required : true,
    }, */
    productName :{
        type: String,
        required : true,
    },
    productCode : {
        type : String,
        required : true,
    },
    description:{
        type : String,
        required : true,
    },
    price:{
        type : Number,
        required : true,
    },
    rating:{
        type : Number,
        required : true,
    },
    manufacturer : {
        type : String,
        required: true,
    },
    osType: {
        type : String,
        reqired : true,
    },
    quantity:{
        type : Number,
    }
},
    {
        timestamps:{
            createdAt: true,
            updatedAt : true,
        },
});

productSchema.plugin(autoIncrement.plugin,{
    model:'product',
    field: 'productId',
    startAt: 1,
    incrementBy : 1
})

module.exports = mongoose.model('Products',productSchema);