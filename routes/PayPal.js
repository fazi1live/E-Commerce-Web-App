const express = require('express');
const Router = express.Router();
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ATXsRtel_YoAQHVIwP4Z_bmX3VkL1n1N_fJ6FH2os0GynozBJo-Oler8wFVvXzoPpNwbfCAYFvCL76Ke',
    'client_secret': 'EAwUmjDRpC-fqz_Fcs262MKrdMDltXJnWiA-N6gURWcJq1N9IpwzISfcCMLNHzXFJ_38YLQXG3jtUK8a'
  });

  Router.post('/Pay',(req,res)=>{
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:7070/PayPal/PaymentSuccess",
            "cancel_url": "http://localhost:7070/PayPal/PaymentCancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "ball",
                    "sku": "001",
                    "price": "25.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "25.00"
            },
            "description": "Testing Product"
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            res.json({
                Message:'Un Approved',
                Error:error.message
            })
        } else {
            payment.links.map(_AllLinks=>{
                if(_AllLinks.rel === 'approval_url'){
                    res.json({
                        Message:'Approved',
                        Url:_AllLinks.href
                    })
                }
            })
        }
    });
  })

  Router.get('/PaymentSuccess',(req,res)=>{
    let payerId = req.query.PayerID;
    let paymentId = req.query.paymentId;

    console.log({
        payerId:payerId,
        paymentId:paymentId
    });
    let execute_payment_json = {
        "payer_id" : payerId,
        "transaction" : [{
            "amount":{
                "currency":"USD",
                "total":"25.00"
            }
        }]
    }

    paypal.payment.execute(paymentId,execute_payment_json, function(error,payment){
        if(error){
            res.json({
                Error:error.message,
                Message:error
            })
        }else {
            res.json({
                Result:payment
            })
        }
    })
})

Router.get('/PaymentCancel',(req,res)=>{
    res.json({
        Result:'Cancelled'
    })
})
 
  module.exports = Router;