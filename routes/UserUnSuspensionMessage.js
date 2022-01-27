const express = require('express');
const Router = express.Router();
const UserUnSuspensionMessage = require('../app/models/UserUnSuspensionMessageModel');
const UserCluster = require('../app/models/UserModel');

// Posting Users UnSuspension Request Message
Router.post('/UnSuspensionMessageRequest', (req, res,) => {
    _UserId = req.body.Id;
    UserUnSuspensionMessage.findOne({ UserId: _UserId })
        .then(result => {
            if (result) {
                res.json({
                    Message: 'Cannot Send More Messages as You Have Already Sent The Request For Unsuspension To Admin!',
                    Data: null,
                })
            }
            else {
                const _UserUnSuspensionMessage = new UserUnSuspensionMessage({
                    UserId: req.body.Id,
                    Message: req.body.USM
                });
                _UserUnSuspensionMessage
                    .save()
                    .then(result => {
                        res.json({
                            Message: "We Have Got Your Message And We Will Take Action Accordingly",
                            Data: result
                        })
                    })
                    .catch(err => {
                        res.json({
                            Error: err.message,
                            ErrorObject: err,
                            Data: null,
                        })
                    });
            }
        })
        .catch(err => {
            res.json({
                Error: err.message,
                ErrorObject: err,
                Data: null,
            })
        })

});
// Posting Users UnSuspension Request Message


//Getting User Request with The Whole Data

Router.post('/UnSuspensionBodyRequest', async (req, res) => {
    try {
    const data = await UserUnSuspensionMessage.find({UserId:{$in:req.body.data}})
    .populate('UserId')
    .lean();
    res.json(data);
    } catch (err) {
        res.json(err);
    }
   
})
//Getting User Request with The Whole Data


//Deleting The User Request From UserUnSuspension Requests SandBox
Router.delete('/DeleteUnSuspensionRequest:id', (req, res) => {
    const _UnSuspensionSandBoxId = req.params.id;
    UserUnSuspensionMessage.remove({ _id: _UnSuspensionSandBoxId })
        .then(result => {
            res.json({
                Message: "The Request Is Deleted",
                Data: true,
                Result: result
            })
        })
        .catch(error => {
            res.json({
                Message: error.message
            })
        });
})
//Deleting The User Request From UserUnSuspension Requests SandBox


module.exports = Router;