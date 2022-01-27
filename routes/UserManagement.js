const express = require('express');
const UserCluster = require('../app/models/UserModel');
const Router = express.Router();
const multer = require('multer');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Making The Storage using Multer 
var storage = multer.diskStorage({
    destination: function (req, file, cb) { cb(null, './UserImages') },
    filename: function (req, file, cb) { cb(null, Date.now() + file.originalname) }
})
const upload = multer({
    storage: storage
})
// Making The Storage using Multer 

// Posting Users to the Db With Collection Name UserCluster Api fo Registeration
Router.post('/RegisterUser', upload.single('UserImage'), (req, res,) => {

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

    const _RegisterUser = new UserCluster({
        Name: req.body.name,
        Email: req.body.email,
        Mobile: req.body.mobile,
        Password: req.body.password,
        ImageUrl: req.file.filename,
        ImageName: req.file.originalname,
        ImageMimeType: req.file.mimetype,
        Address: req.body.address
    });
    _RegisterUser
        .save()
        .then(result => {
            res.json({
                Message: req.body.name + " Register Successfully",
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
});
// Posting Users to the Db With Collection Name UserCluster



//Login User: Api for Login User
Router.post('/UserLogin', (req, res) => {
    _Email = req.body.email;
    _Password = req.body.password;
    UserCluster.findOne({ Email: _Email })
        .then(user => {
            if(user.Status === 0){
                res.json({
                    Message:'You Cannot Login Because You Are Suspended By Admin Please Contact Admin',
                    Result:user,
                    Data:null
                })
            }
            else{
            if (user.length <= 0) {
                res.json({
                    Message: 'Authentication Failed Either Incorrect Password or Email',
                    Result: user,
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
                            'UserLogin',
                            { expiresIn: '1h' }
                        )

                        res.json({
                            Message: 'Authentication SuccessFull',
                            Data: user,
                            Result:result,
                            Token:_Token
                        })
                    }
                    else {
                        res.json({
                            Message: 'Authentication Failed Either Incorrect Password or Email',
                            Data: 'Not Found ' + result,
                            Error: error,
                            Data:null
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
                Data:null,
                Name:''
            })
        })
})
//Login User: Api for Login User


//Deleting the Users with Id for, User Cluster
Router.delete('/deleteUser:_imageUrl', (req, res) => {
    const imageUrl = req.params._imageUrl;
    fs.unlinkSync('./UserImages/' + imageUrl);
    UserCluster.remove({ ImageUrl:imageUrl })
        .then(result => {
            res.json({
                message: "The User is Removed with Name " + imageUrl,
                Result:result
            })
        })
        .catch(error => {
            res.json({
                message: "User Not FOund" + error.message
            })
        });
        
})
//Deleting the Users with Id for, User Cluster

//Get All Users from the User Cluster
Router.get('/getAllUsers', (req, res) => {
    UserCluster.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });
    
})
//Get All Users from the User Cluster


//Get All Suspended USer
Router.get('/getAllSuspendedUsers',(req,res)=>{
    UserCluster.find({Status:0})
    .then(result=>{
        res.json({
            Data:true,
            TotalUsers:result.length,
            Message:'The List Of Suspended Users is',
            SuspendedUsers:result,
        })
        
    })
    .catch(error=>{
        res.json({
                Message: "No Suspended User",
                Error: 'Not Found ' + Error.message,
                Data:null
        })
    })
})
//Get All Suspended USer


//Suspend Any Users With ID from the User Cluster
Router.put('/SuspendUser/:UserId',(req,res)=>{
    const _UserId=req.params.UserId;
    const _UpdateStatus=0;
    UserCluster.updateOne({_id:_UserId},{$set:{Status:_UpdateStatus}})
    .then(result=>{
        res.json({
            message:"User Suspended SuccessFully",
            UpdatedProduct:result,
            Data:1
        })
    })
    .catch(error=>{
        res.json({message:error.message})
    })
});
//Suspend Any Users With ID from the User Cluster

//UnSuspend Any Users With ID from the User Cluster
Router.put('/UnSuspendUser/:UserId',(req,res)=>{
    const _UserId=req.params.UserId;
    const _UpdateStatus=1;
    UserCluster.updateOne({_id:_UserId},{$set:{Status:_UpdateStatus}})
    .then(result=>{
        res.json({
            message:"User UnSuspended SuccessFully",
            UpdatedProduct:result,
            Data:0
        })
    })
    .catch(error=>{
        res.json({message:error.message})
    })
});
//UnSuspend Any Users With ID from the User Cluster


module.exports = Router;