const mongoose = require('mongoose');

// Date
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
const year = today.getFullYear();

const OrderSchema=mongoose.Schema({
    ProductDetails:{},
        SenderDetails:{},
        CartTotal:{},
        CartTotalIncludingShipmentCharges:{},
        TotalItems:{},
    CreatedDate:{type:Date,default:Date.now},
    Date: {
        type: String,
        default: `${year}-${month}-${day}`,
    },
    },{timestamps: true,},{strict:false})




module.exports=mongoose.model('OrderCollection',OrderSchema);