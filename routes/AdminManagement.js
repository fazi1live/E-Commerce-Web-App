const express = require('express');
const AdminManagementCluster = require('../app/models/AdminManagementModel');
const Router = express.Router();
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Making The Storage using Multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './AdminImages') },
    filename: function (req, file, cb) { cb(null, Date.now() + file.originalname) }
})
const upload = multer({
    storage: storage
})
// Making The Storage using Multer 

// Posting Users to the Db With Collection Name UserCluster Api fo Registeration
Router.post('/RegisterAdmin', upload.single('AdminImage'), (req, res,) => {
    AdminManagementCluster.find()
        .then(result => {
            if (result.length >= 2) {
                res.json({
                    Message: "Admin Registeration is Constraint",
                    Status: 0,
                    Data: 0
                })
            }
            else {
                const _RegisterAdmin = new AdminManagementCluster({
                    Name: req.body.name,
                    Email: req.body.email,
                    Mobile: req.body.mobile,
                    Password: req.body.password,
                    ImageUrl: req.file.filename,
                    ImageName: req.file.originalname,
                    ImageMimeType: req.file.mimetype,
                    Address: req.body.address
                });
                _RegisterAdmin
                    .save()
                    .then(result => {

                        res.json({
                            Message: result.Name + " Register Successfully",
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
        .catch(error => {
            console.log(error.message);
        })
    //1 Manual Api for testing Uniqueness of Data.
    // RegisterUserModel.findOne({ $or: [{ Name: req.body.name }, { Email: req.body.email }] }).then(UserExist => {
    //     console.log(UserExist);
    //     if (UserExist) {
    //         if (UserExist.Email==req.body.email) {
    //             res.json({
    //                 Message: 'User Already Exists With This Email',
    //                 Data: null
    //             });
    //         }
    //         else if(UserExist.Name==req.body.name){
    //             res.json({
    //                 Message: 'User Already Exists With This UserName',
    //                 Data: null
    //             });
    //         }
    //         else{
    //             res.json({
    //                 Message: 'User Already Exists With This UserName and Email',
    //                 Data: null
    //             });
    //         }
    //     }
    //     else {
    //         const _RegisterUser = new RegisterUserModel({
    //             Name: req.body.name,
    //             Email: req.body.email,
    //             Mobile: req.body.mobile,
    //             Password: req.body.password,
    //             ImageUrl: req.file.filename,
    //             ImageName: req.file.originalname,
    //             ImageMimeType: req.file.mimetype,
    //             Address: req.body.address
    //         });
    //         _RegisterUser
    //             .save()
    //             .then(result => {
    //                 res.json({
    //                     Message: "User Register Successfully",
    //                     Data: result
    //                 })
    //             })
    //             .catch(err => {
    //                 res.json({
    //                     Error: err.message,

    //                 })
    //             });
    //     }
    // })
});
// Posting Users to the Db With Collection Name UserCluster



//Login User: Api for Login User
Router.post('/AdminLogin', (req, res) => {
    _Email = req.body.email;
    _Password = req.body.password;
    AdminManagementCluster.findOne({ Email: _Email })
        .then(user => {
            if (user.Status === 0) {
                res.json({
                    Message: 'You Cannot Login Because You Are Suspended By Admin Please Contact Admin'
                })
            }
            else {
                if (user.length <= 0) {
                    res.json({
                        Message: 'Authentication Failed Either Incorrect Password or Email',
                        Result: user + null,
                        Data:null
                    })
                }
                else {
                    bcrypt.compare(_Password, user.Password, (error, result) => {
                        if (result) {
                            const _Token = jwt.sign(
                                {
                                    Email: user.Email,
                                    UserId: user._id
                                },
                                'AdminLogin',
                                { expiresIn: '1h' }
                            )

                            res.json({
                                Message: 'Authentication SuccessFull',
                                Data: 'Found ' + result,
                                Token: _Token,
                                UserData:user
                            })
                        }
                        else {
                            res.json({
                                Message: 'Authentication Failed Either Incorrect Password or Email',
                                Data: null,
                                Error: error
                            })
                        }
                    })
                }
            }
        })
        .catch(Error => {
            res.json({
                Message: "Authentication Failed Either Incorrect Password or Email",
                Error: 'Not Found ' + Error.message,
                Data:null
            })
        })
})
//Login User: Api for Login User


//Get Admin Data
Router.get('/getAdmin', (req, res) => {
    AdminManagementCluster.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });
    
})
//Get Admin Data

//GetAdmin Data By ID
Router.get('/getAdminDataById/:_Id',(req,res)=>{
    const _AdminId=req.params._Id;
    AdminManagementCluster.findOne({_id:_AdminId})
    .then(result=>{
        res.json({
            message:"Admin Data Found Successfully",
            AdminData:result
        })
    })
    .catch(error=>{
        res.json({message:error.message})
    })
});
//GetAdmin Data By ID

// UpdateDate By ID
Router.put('/updateAdminLoginTime/:_Id',(req,res)=>{
    const _AdminId=req.params._Id;
    var NewDate=new Date(Date.now()).toISOString();
    AdminManagementCluster.updateOne({_id:_AdminId},{$set:{CreatedDate:NewDate}})
    .then(result=>{
        res.json({
            Message:"Date Updated Successfully",
            UpdatedDate:result
        })
    })
    .catch(error=>{
        res.json({message:error.message})
    })
})
// UpdateDate By ID




module.exports = Router;