const express = require('express');
const Router = express.Router();
const ProductCluster = require('../app/models/productModel');
const MultipleImageProduct = require('../app/models/multipleImageProduct');
const CartItemCluster = require('../app/models/CartItemModel');
const FeatureProductCluster = require('../app/models/FeatureProductModel');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');




//Block Start For Hashing the ImageUrl
const hashFunc = (fileName) => {
    const hash = crypto.createHash('md5');
    hash.update(fileName);
    const md5sum = hash.digest('hex');
    return md5sum;
  };
//Block Ends For Hashing the ImageUrl




 //***************************** Product Card Block Started It Contain PostCards GetCards DeleteCards UpdateCardQuantity GetCardById ************************************


// Start Block Posting Multiple Images with subFolder

let uploadMultipleImages = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            let path = `./files/${req.body.productName}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err,res) {
                    if (err) {
                        res.json(err);
                     }
                     else{
                         res.json('Saved Succefully');
                     }
                });
            }
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
      //originalname is the uploaded file's name with date iso String
      let ext = file.mimetype.split('/')[1];
      // Fix svg+xml bug
      if (ext.includes('svg')) {
        ext = 'svg';
      }

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/postMultipleCards', uploadMultipleImages.array('images', 20), async(req, res,next) => {
    try {
       const docs = await MultipleImageProduct.findOne({ productName: req.body.productName });
       if (docs) {
        req.files.map(PathOfFilesToRemove=>{
            fs.unlinkSync('./files/'+`/${req.body.productName}/${PathOfFilesToRemove.filename}`);
        })
        res.json({
            Message: "Products already exists"
        });
    }
    else {
        const fileToSave = req.files.map(file => ({
            imageName: file.originalname,
            imageMimeType: file.mimetype,
            imageUrl: `${req.body.productName}/${file.filename}`
        }))
        const sizeToSave = req.body.size;
        const docToSave = new MultipleImageProduct({
            productName: req.body.productName,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            category: req.body.category,
            altImageName: req.body.altImage,
            imgDetails: fileToSave,
            sizeDetails:sizeToSave,
            fabric:req.body.fabrics,
            logo:req.body.logo,
            color:req.body.color
        })
        docToSave.save().then(result => {
            res.status(200).json({ Message: 'Card Saved'})
        })
    }

    } catch (err) {
        req.files.map(PathOfFilesToRemove=>{
            fs.unlinkSync('./files'+`/${req.body.productName}/${PathOfFilesToRemove.filename}`);
        })
        res.status(500).json({ Message: err.message });
        console.log(err.message);
    }
});

// End Block Posting Multiple Images with subFolder

// get multiple image api
Router.get('/getMultipleCards', async (req, res) => {
    try {
        let _Data = await MultipleImageProduct.find();
        res.json(_Data);
    } catch (error) {
        res.json(err.message);
    }
})
// get multiple image api

//Get Multiple imageData from req.id
Router.get('/GetMultipleImagesCardById/:_ID', async(req,res)=>{
    let _ID = req.params._ID;
    try {
        let _Data = await MultipleImageProduct.findById({_id:_ID});
        res.json({
            Message:'Data Found Successfully',
            Data:true,
            Result:_Data
        })
    } catch (error) {
        res.json({
            Message:`There is some error and it is ${error.message}`,
            Data:false,
            Result:null
        })
    }
})
//Get Multiple imageData from req.id

// Deleting Card+ file Api
Router.delete('/deleteCard:FolderName', async(req, res) => {
    const _FolderName = req.params.FolderName;
    let _Data = await MultipleImageProduct.findOne({productName:_FolderName});
    _Data.imgDetails.map(PathOfFilesToRemove=>{
        fs.unlinkSync('./files'+`/${PathOfFilesToRemove.imageUrl}`);
    })
    fs.rmdirSync(`./files/${_FolderName}`);
    MultipleImageProduct.remove({ productName: _FolderName })
        .then(result => {
            res.json({
                message: "The card is Removed with Name " + _FolderName,
                Result: result
            })
        })
        .catch(error => {
            res.json({
                message: "Invalid Id or Id not FOund " + error.message
            })
        });
})


//Updating ProductData Quantity

Router.put('/UpdateProducts/:_productId', (req, res) => {
    const _ProductId = req.params._productId;
    MultipleImageProduct.updateOne({ _id: _ProductId }, { $set: { quantity: req.body.UpdateQuantity } })
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


//***************************** Product Card Block Started It Contain PostCards GetCards DeleteCards UpdateCardQuantity GetCardById ************************************



//*************************** Block Start for cart and quantity management **********************************//


//Populating CartItems 
Router.post('/PopulateCartItems', (req, res) => {
    const _CartItemCluster = new CartItemCluster({
        productName: req.body.productName,
        price: req.body.price,
        productId: req.body._id
    });
    _CartItemCluster
        .save()
        .then(result => {
            res.json({
                Message: "Data Stored Successfully",
                Data: result
            })
        })
        .catch(err => {
            res.json({
                Error: err.message,

            })
        });
})

//Getting CartItems

Router.get('/GetCartItems', (req, res) => {
    res.json('Reached');
})


//Managing The Quantites
Router.get('/ManagingQuantity:_Name', (req, res) => {
    const _name = req.params._Name;
    ProductCluster.findOne({ productName: _name })
        .then(result => {
            res.json({
                message: "This is the product with name " + _name,
                DataForThisName: result,
                Quantity: result.quantity
            })
        })
        .save(result => {
            result.quantity = result.quantity - 1;
        })
        .catch(err => {
            res.json({ Message: err });
        })
});

//*************************** Block Start for cart and quantity management **********************************//



//***************************** Feature Cards Block Started It Contain PostCards GetCards DeleteCards UpdateCardQuantity GetCardById ************************************


//Starting Storing Feature Products
let uploadFeatureCardWithMultipleImages = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            let path = `./FeatureProducts/${req.body.productName}`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err,res) {
                    if (err) {
                        res.json(err);
                     }
                     else{
                         res.json('Saved Succefully');
                     }
                });
            }
            cb(null, path);
        },
        filename: (req, file, cb) => {
            const md5sum = hashFunc(file.originalname);
      //originalname is the uploaded file's name with date iso String
      let ext = file.mimetype.split('/')[1];
      // Fix svg+xml bug
      if (ext.includes('svg')) {
        ext = 'svg';
      }

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/postFeatureCard', uploadFeatureCardWithMultipleImages.array('FeatureProductImage', 20), async (req, res) => {
    try {
        const docs = await FeatureProductCluster.findOne({ productName: req.body.productName });
        if (docs) {
         req.files.map(PathOfFilesToRemove=>{
             fs.unlinkSync('./FeatureProducts/'+`${req.body.productName}/${PathOfFilesToRemove.filename}`);
         })
         res.json({
             Message: "Products already exists"
         });
     }
     else {
         const fileToSave = req.files.map(file => ({
             imageName: file.originalname,
             imageMimeType: file.mimetype,
             imageUrl: `${req.body.productName}/${file.filename}`
         }))
         const sizeToSave = req.body.size.map(size=>({
             size:size
         }))
         const docToSave = new FeatureProductCluster({
             productName: req.body.productName,
             price: req.body.price,
             quantity: req.body.quantity,
             description: req.body.description,
             altImageName: req.body.altImage,
             imgDetails: fileToSave,
             sizeDetails:sizeToSave,
             fabric:req.body.fabrics,
             logo:req.body.logo,
             color:req.body.color
         })
         docToSave.save().then(result => {
             res.status(200).json({
                  Message: 'Card Saved'
                })
         })
     }
 
     } catch (err) {
         req.files.map(PathOfFilesToRemove=>{
             fs.unlinkSync('./FeatureProducts/'+`${req.body.productName}/${PathOfFilesToRemove.filename}`);
         })
         fs.rmdirSync(`./FeatureProducts/${req.body.productName}`);
         res.status(500).json({ Message: err.message });
         console.log(err)
     }
})
//Ending Stroing Feature Products

//Starting Getting Feature Products
Router.get('/getFeatureCards', (req, res) => {
    FeatureProductCluster.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });

})
//Ending Getting Feature Products

//Starting Deleting Feature Products
Router.delete('/deleteFeatureCard:FolderName', async (req, res) => {
    const _FolderName = req.params.FolderName;
    let _Data = await FeatureProductCluster.findOne({productName:_FolderName});
    _Data.imgDetails.map(PathOfFilesToRemove=>{
        fs.unlinkSync('./FeatureProducts'+`/${PathOfFilesToRemove.imageUrl}`);
    })
    fs.rmdirSync(`./FeatureProducts/${_FolderName}`);
    FeatureProductCluster.remove({ productName: _FolderName })
        .then(result => {
            res.json({
                message: "The card is Removed with Name " + _FolderName,
                Result: result
            })
        })
        .catch(error => {
            res.json({
                message: "Invalid Id or Id not FOund " + error.message
            })
        });

})
//Ending Deleting Feature Products

// Starting Updating Feature Products Quantity

Router.get('/GetFeatureProductById/:_FeatureProductId', (req, res) => {
    const _Id = req.params._FeatureProductId;
    FeatureProductCluster.findById(_Id)
        .then(result => {
            res.json({
                message: "This is the product with id " + _Id,
                Result: result
            })
        })
        .catch(error => {
            res.json({ message: error.message })
        })
})

Router.put('/UpdateFeatureProductById/:_FeatureProductId', (req, res) => {
    const _Id = req.params._FeatureProductId;
    FeatureProductCluster.updateOne({ _id: _Id }, { $set: { quantity: req.body.UpdateQuantity } })
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
// Ending Updating Feature Products Quantity


//***************************** Feature Cards Block Started It Contain PostCards GetCards DeleteCards UpdateCardQuantity GetCardById ************************************
module.exports = Router;