const { json } = require('body-parser');
const express = require('express');
const { findOne } = require('../app/models/WebsiteStatsModel');
const Router = express.Router();
const WebsiteStatsCluster = require('../app/models/WebsiteStatsModel');

//One Time Posting The Website Stats Data. This will excute manually as we dont need it again and again 
Router.post('/postStats', async (req, res,) => {
    try {
        const _CheckIfWebSiteStatsAlreadyExist = await WebsiteStatsCluster.find();
        if (_CheckIfWebSiteStatsAlreadyExist.length > 0) {
            res.json({
                Message: `WebSite Stats Already Exists Cannot Duplicate`,
                Data: false
            })
        } else {
            const _WebsiteStatsCluster = new WebsiteStatsCluster();
            await _WebsiteStatsCluster.save();
            const _UpdatedWebSiteStatsOneTime = await _WebsiteStatsCluster.update({Status:1});
            res.json({
                Message: "WebsiteStats Posted Successfully",
                Data: true
            })
        }
    } catch (error) {
        res.json({
            Error: error.message,
            ErrorObject: error,
            Data: false,
        })
    }
});
//One Time Posting The Website Stats Data. This will excute manually as we dont need it again and again 




//Update WebsiteStats For Visitor Counter This Api will Run On App.Get(){res.SendFile()}
//And It will increment by 1 when ever our websites loads.Ass app.get send our whole app to browser that means loading it.
Router.put('/UpdateVisitors/:Id', (req, res) => {
    const _UserCounter = req.body.UpdateNewVisitors;
    const _Id = req.params._Id;
    WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'NewVisitors.VisitorCounter': _UserCounter } })
        .then(result => {
            res.json({
                message: "Updated Successfully Please Close It",
                UpdatedProduct: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Update WebsiteStats For Visitor Counter This Api will Run On App.Get(){res.SendFile()}
//And It will increment by 1 when ever our websites loads.Ass app.get send our whole app to browser that means loading it.




//Update WebsiteStats For Total Purchases This Api Will RUn for Every Successfull CheckOut
//And It Will Increment by Each CheckOut Total
Router.put('/UpdatePurchases/:Id', (req, res) => {
    const _AddNewValueToPurchases = req.body.NewPurchasesValue;
    const _Id = req.params._Id;
    WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'Purchases.PurchasesCounter': _AddNewValueToPurchases } })
        .then(result => {
            res.json({
                message: "Updated Successfully Please Close It",
                UpdatedProduct: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Update WebsiteStats For Total Purchases This Api Will RUn for Every Successfull CheckOut
//And It Will Increment by Each CheckOut Total





//Update WebsiteStats For Total ActiveUsers Or Total Users This Api Will RUn for Every Successfull User SignUp and 
// It will increment by 1 for each Registeration
Router.put('/UpdateActiveUsers/:Id', (req, res) => {
    const _IncrementActiveUsers = 1;
    const _Id = req.params._Id;
    WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'ActiveUsers.UserCounter': _IncrementActiveUsers } })
        .then(result => {
            res.json({
                message: "Updated Successfully Please Close It",
                UpdatedProduct: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Update WebsiteStats For Total ActiveUsers Or Total Users This Api Will RUn for Every Successfull User SignUp and 
// It will increment by 1 for each Registeration



//Update WebsiteStats For Total Clicks This Api Will RUn for Every Click On Products
// It will increment by 1 for each Click On Products
Router.put('/UpdateProductClicks/:Id', (req, res) => {
    const _IncrementClicks = req.body.UpdateClicks;
    const _Id = req.params._Id;
    WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'ProductClicks.ClicksCounter': _IncrementClicks } })
        .then(result => {
            res.json({
                message: "Updated Successfully Please Close It",
                UpdatedProduct: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Update WebsiteStats For Total Clicks This Api Will RUn for Every Click On Products
// It will increment by 1 for each Click On Products



//Update WebsiteStats For Total Returned. This Api will Call from the User Portal If he wants to returned Within 24 Hours
//Otherwise The Button will Dissappear. Now In Admin Portal in Orders Analytics Here Admin can see who returned this order and 
// Order Should have USer Id and Product Id as Foreign Keys
Router.put('/UpdateReturned/:Id', (req, res) => {
    const _IncrementReturns = req.body.TotalReturns;
    const _Id = req.params._Id;
    WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'TotalReturns.RerutnsCounter': _IncrementReturns } })
        .then(result => {
            res.json({
                message: "Updated Successfully Please Close It",
                UpdatedProduct: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Update WebsiteStats For Total Returned. This Api will Call from the User Portal If he wants to returned Within 24 Hours
//Otherwise The Button will Dissappear. Now In Admin Portal in Orders Analytics Here Admin can see who returned this order and 
// Order Should have USer Id and Product Id as Foreign Keys



//Get ALl Websites Stats
Router.get('/getWebsiteStats', (req, res) => {
    WebsiteStatsCluster.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });

})
//Get ALl Websites Stats


//Decrement in TotalUser by -1 for every time Admin Delete the Users from Admin Pannel
Router.put('/DecrementActiveUsers/:Id', (req, res) => {
    const _DecrementActiveUsers = -1;
    const _Id = req.params._Id;
    WebsiteStatsCluster.findOne({ _Id })
        .then(result => {
            if (result.ActiveUsers.UserCounter > 0) {
                WebsiteStatsCluster.updateOne({ _Id }, { $inc: { 'ActiveUsers.UserCounter': _DecrementActiveUsers } })
                    .then(result => {
                        res.json({
                            message: "Updated Successfully",
                            UpdatedProduct: result
                        })
                    })
            }
            else {
                res.json({
                    message: "You Cannot Delete User More Because You Dont Have Any ActiveUsers",
                    UpdatedProduct: result
                })
            }
        })
        .catch(error => {
            res.json({ message: error.message })
        })
});
//Decrement in TotalUser by -1 for every time Admin Delete the Users from Admin Pannel
module.exports = Router;