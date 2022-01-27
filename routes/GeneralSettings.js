const express = require("express");
const Router = express.Router();
const multer = require("multer");
const fs = require("fs");
const CardOne = require(".././app/models/CardOneModel");
const CardTwo = require(".././app/models/CardTwoModel");
const CardThree = require(".././app/models/CardThreeModel");
const CardFour = require(".././app/models/CardFourModel");
const AddingFooterDynamically = require ('../app/models/AddingFooterHeadingModel');
const AddingFooterImageCollection = require('../app/models/AddingFooterImageDynamicallyModel');
const crypto = require('crypto');

//Block Start For Hashing the ImageUrl
const hashFunc = (fileName) => {
  const hash = crypto.createHash('md5');
  hash.update(fileName);
  const md5sum = hash.digest('hex');
  return md5sum;
};
//Block Ends For Hashing the ImageUrl

// Start Block Posting CardOne with subFolder

let uploadCardOne = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let path = `./ProductCategoryImages/${req.body.FolderName}`;
            let path = `./ProductCategoryImages/CardOne`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
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

          cb(null,`${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/MenCardImage', uploadCardOne.single('image'), async (req, res, next) => {
    let DocsToManage = await CardOne.find();  
    try {
        //Operation to check and Delete Existing Document
        if (DocsToManage.length===0) {
          void(0);
        } else {
          await CardOne.deleteMany();
          fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        }
        //Operation to check and Delete Existing Document
  
        const imageToSaveInfo = {
          imageUrl: `CardOne/${req.file.filename}`,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        };
        const docToSave = await new CardOne(
          imageToSaveInfo
        );
        docToSave.save().then((result) => {
          res.json({
            Message: "image Updated Successfully",
            Data: result,
            Status: 1
          });
        });
      } catch (error) {
        fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        res.json({
          Error: error.message, 
          Data: null,
          Status: 0,
        });
      }
});

// End Block Posting CardOne with subFolder

// Start Block Posting CardOne with subFolder

let uploadCardTwo = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let path = `./ProductCategoryImages/${req.body.FolderName}`;
            let path = `./ProductCategoryImages/CardTwo`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
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

            cb(null,`${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/WomenCardImage', uploadCardTwo.single('image'), async (req, res, next) => {
    let DocsToManage = await CardTwo.find();  
    try {
      
        //Operation to check and Delete Existing Document
        if (DocsToManage.length===0) {
          void(0);
        } else {
          await CardTwo.deleteMany();
          fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        }
        
        //Operation to check and Delete Existing Document
  
        const imageToSaveInfo = {
          imageUrl: `CardTwo/${req.file.filename}`,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        };
        const docToSave = await new CardTwo(
          imageToSaveInfo
        );
        docToSave.save().then((result) => {
          res.json({
            Message: "image Updated Successfully",
            Data: result,
            Status: 1
          });
        });
      } catch (error) {
        fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        res.json({
          Error: error.message, 
          Data: null,
          Status: 0,
        });
      }
});

// End Block Posting CardOne with subFolder


// Start Block Posting CardOne with subFolder

let uploadCardThree = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let path = `./ProductCategoryImages/${req.body.FolderName}`;
            let path = `./ProductCategoryImages/CardThree`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
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

          cb(null,`${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/AccessoriesCardImage', uploadCardThree.single('image'), async (req, res, next) => {
    let DocsToManage = await CardThree.find();  
    try {
        //Operation to check and Delete Existing Document
        if (DocsToManage.length===0) {
          void(0);
        } else {
          await CardThree.deleteMany();
          fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        }
        //Operation to check and Delete Existing Document
  
        const imageToSaveInfo = {
          imageUrl: `CardThree/${req.file.filename}`,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        };
        const docToSave = await new CardThree(
          imageToSaveInfo
        );
        docToSave.save().then((result) => {
          res.json({
            Message: "image Updated Successfully",
            Data: result,
            Status: 1
          });
        });
      } catch (error) {
        fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        res.json({
          Error: error.message, 
          Data: null,
          Status: 0,
        });
      }
});

// End Block Posting CardOne with subFolder


// Start Block Posting CardOne with subFolder

let uploadCardFour = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let path = `./ProductCategoryImages/${req.body.FolderName}`;
            let path = `./ProductCategoryImages/CardFour`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
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

          cb(null,`${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/CollectionsCardImage', uploadCardFour.single('image'), async (req, res, next) => {
    let DocsToManage = await CardFour.find();  
    try {
        //Operation to check and Delete Existing Document
        if (DocsToManage.length===0) {
          void(0);
        } else {
          await CardFour.deleteMany();
          fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        }
        //Operation to check and Delete Existing Document
  
        const imageToSaveInfo = {
          imageUrl: `CardFour/${req.file.filename}`,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        };
        const docToSave = await new CardFour(
          imageToSaveInfo
        );
        docToSave.save().then((result) => {
          res.json({
            Message: "image Updated Successfully",
            Data: result,
            Status: 1
          });
        });
      } catch (error) {
        fs.unlinkSync(`./ProductCategoryImages/${DocsToManage[0].imageUrl}`);
        res.json({
          Error: error.message, 
          Data: null,
          Status: 0,
        });
      }
});

// End Block Posting CardOne with subFolder


//Block Starts For Adding Footer Heading Dynamically
Router.post('/FooterHeading', async (req,res)=>{
  let _HeadingCategory =  req.body.HeadingCategory;
  let _Heading = req.body.Heading;
  let _HeadingDescription = req.body.HeadingDescription;
  let _RequestBodyData = req.body;
  let _Data = await AddingFooterDynamically.find();
  try {
    if (_Data.length <= 0){
      //If the Collecion is Empty hen Save A New Document
      const _DocToSave = await new AddingFooterDynamically(_RequestBodyData);
      _DocToSave.save().then(docs=>{
        res.json({
          Message:'New Heading Added Successfully',
          Data:true
        });
      });
    } else{
      // If there is/are Documents are in the collection then Update It.
        _HeadingCategoryExist = await AddingFooterDynamically.find({HeadingCategory:_HeadingCategory}); 
        if (_HeadingCategoryExist.length > 0){ //It mean we have focund the document with Heading Category
          await AddingFooterDynamically.findOneAndUpdate({HeadingCategory:_HeadingCategory},{$set:{Heading:_Heading,HeadingDescription:_HeadingDescription}})
          .then(() => {
            res.json({
              Message:`${_HeadingCategory} Updated Successfully`
            })
          })
        }else {
          //If The We done FInd The _HeadingCategory There Then add a new document
          const _DocToSave = await new AddingFooterDynamically(_RequestBodyData);
          _DocToSave.save().then(docs=>{
            res.json({
              Message:`${_HeadingCategory} Added Successfully`
            });
          });
        }
      }
  } catch (error) {
    res.json({
      Message:error.message,
      Data:false
    })
  }
})
//Block Ends  For Adding Footer Heading Dynamically

//Block Start For Adding The Footer ImageUrl

let uploadFooterImage = multer({
    storage: multer.diskStorage({
        destination: (req, next, cb) => {
            // let path = `./ProductCategoryImages/${req.body.FolderName}`;
            let path = `./FooterImage`;
            if (!fs.existsSync(path)) {
                fs.mkdirSync(path, function (err, res) {
                    if (err) {
                        res.json(err);
                    }
                    else {
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

            cb(null,`${Date.now()}_${md5sum}.${ext}`);
        }
    })
});

Router.post('/FooterImage', uploadFooterImage.single('FooterImage'), async(req,res)=>{
  let DocsToManage = await AddingFooterImageCollection.find();  
    try {
        //Operation to check and Delete Existing Document
        if (DocsToManage.length===0) {
          void(0);
        } else {
          await AddingFooterImageCollection.deleteMany();
          fs.unlinkSync(`./FooterImage/${DocsToManage[0].imageUrl}`);
        }
        //Operation to check and Delete Existing Document
  
        const imageToSaveInfo = {
          imageUrl: req.file.filename,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        };
        const docToSave = await new AddingFooterImageCollection(
          imageToSaveInfo
        );
        docToSave.save().then((result) => {
          res.json({
            Message: "image Updated Successfully",
            Data: result,
            Status: 1
          });
        });
      } catch (error) {
        fs.unlinkSync(`./FooterImage/${DocsToManage[0].imageUrl}`);
        res.json({
          Error: error.message, 
          Data: null,
          Status: 0,
        });
      }
})
//Block Ends For Adding The Footer ImageUrl

//Block ENds For Adding Footer Heading Dynamically


//Block Starts Getting the Data For Settings

//Block Start For Getting Footer ImageUrl
Router.get('/FooterImage', async (req,res)=>{
  let _Data = await AddingFooterImageCollection.find();
  res.json({
    Message:"Data Got Successfully",
    Data:true,
    Result:_Data
   })
})
//Block Ends For Getting Footer Imageurl

//Block Start Get Heading For Footer 
Router.get('/FooterHeading', async(req,res)=>{
  let _Data = await AddingFooterDynamically.find();
  res.json({
    Message:"Data Got Successfully",
    Data:true,
    Result:_Data
   })
})
//Block Ends Get Heading For Footer 



//Block Starts To Get All Product Category Images
Router.get('/MenCardImage', (req, res) => {
  CardOne.find().then(data => {
      res.json(data);
  }).catch(err => { res.json(err.message) });
})


Router.get('/WomenCardImage', (req, res) => {
    CardTwo.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });
})

Router.get('/AccessoriesCardImage', (req, res) => {
    CardThree.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });
})

Router.get('/CollectionsCardImage', (req, res) => {
    CardFour.find().then(data => {
        res.json(data);
    }).catch(err => { res.json(err.message) });
})
//Block Ends To Get All Product Category Images

//Block Starts Getting the Data For Settings
module.exports = Router;
