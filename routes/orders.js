const express=require('express');
const router=express.Router();
const OrderCluster = require('../app/models/OrdersModel');

router.get('/getOrders',async(req,res)=>{
    try {
        let _Order = await OrderCluster.find();
        res.json({
            Status:true,
            Result:_Order
        })
    } catch (error) {
        res.json({
            Status:false,
            Result:error.message
        })
    }
});

router.post('/postOrders',async(req,res)=>{
    try {
    let _OrderObject = req.body;
    const _Order = await OrderCluster.create({
        ProductDetails:_OrderObject.OrderDetails,
        SenderDetails:_OrderObject.SenderDetails,
        CartTotal:_OrderObject.CartTotal,
        CartTotalIncludingShipmentCharges:_OrderObject.CartTotalIncludingShipmentCharges,
        TotalItems:_OrderObject.TotalItems
    });
    res.json({
        Status:true,
        Body:_Order,
        Result:`Saved`
    })
    } catch (error) {
        res.json({
            Status:false,
            Error:error.message,
            Result:`Not Saved`
        })
    }
    
});

router.get('/getOneOrder:_orderId',(req,res)=>{
    const _id=req.params._orderId;
    res.json({
        message:"This is the Order with id "+_id
    })
})

router.put('/updateOrder:_orderId',(req,res)=>{
    const _id=req.params._orderId;
    res.json({
        message:"This is the Order is going to be updated with id "+_id
    })
})

router.delete('/deleteOrder:_orderId',(req,res)=>{
    const _id=req.params._orderId;
    console.log("Hi This is the Order is going to be delete with id "+_id);
    res.json({
        message:"This is the Order is going to be delete with id "+_id
    })
})
module.exports = router;