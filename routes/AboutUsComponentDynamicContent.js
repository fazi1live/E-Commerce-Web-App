const express = require("express");
const Router = express.Router();
const multer = require("multer");
const fs = require("fs");
const crypto = require('crypto');

//Block Starts Aquiring the Shcemas
const AboutUsComponentDynamicContentCollection = require('../app/models/AboutUsComponentDynamicContentModel');
const AboutUsComponentDynamicHeadingsCollection = require('../app/models/AboutUsComponentDynamicHeadings');
const AboutUsComponentDynamicTeam = require('../app/models/AboutUsComponentDynamicTeam');
//Block Ends Aquiring the Shcemas

//Block Start For Hashing the ImageUrl
const hashFunc = (fileName) => {
  const hash = crypto.createHash('md5');
  hash.update(fileName);
  const md5sum = hash.digest('hex');
  return md5sum;
};
//Block Ends For Hashing the ImageUrl


//Block Starts For Adding AboutUs Component Images Dynamically

let uploadAboutUsComponentImage = multer({
  storage: multer.diskStorage({
    destination: (req, next, cb) => {
      // let path = `./ProductCategoryImages/${req.body.FolderName}`;
      let path = `./AboutUsComponentImages`;
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

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
    }
  })
});


Router.post('/Images', uploadAboutUsComponentImage.single('Image'), async (req, res) => {
  let _ImageType = req.body.ImageType;
  let _ImageDetails = {
    imageType: req.body.ImageType,
    imageUrl: req.file.filename,
    imageName: req.file.originalname,
    imageMimeType: req.file.mimetype
  }

  let _Data = await AboutUsComponentDynamicContentCollection.find();
  try {
    if (_Data.length <= 0) {
      //If the Collecion is Empty hen Save A New Document
      const _DocToSave = await new AboutUsComponentDynamicContentCollection(_ImageDetails);
      _DocToSave.save().then(docs => {
        res.json({
          Message: `Image Saved Successfully with Imagetype ${_ImageType}`,
          Data: true
        });
      });
    } else {
      // If there is/are Documents are in the collection then Update It.
      _ImageTypeExist = await AboutUsComponentDynamicContentCollection.find({ imageType: _ImageType });
      if (_ImageTypeExist.length > 0) { //It mean we have focund the document with Heading Category

        await AboutUsComponentDynamicContentCollection.findOneAndUpdate({ imageType: _ImageType }, { $set: { imageUrl: req.file.filename, imageName: req.file.originalname, imageMimeType: req.file.mimetype } })
          .then(() => {
            fs.unlinkSync(`./AboutUsComponentImages/${_ImageTypeExist[0].imageUrl}`);
            res.json({
              Message: `Image Updated Successfully with Imagetype ${_ImageType}`,
              Data: true
            })
          })
      } else {
        //If The We done FInd The _HeadingCategory There Then add a new document
        const _DocToSave = await new AboutUsComponentDynamicContentCollection(_ImageDetails);
        _DocToSave.save().then(docs => {
          res.json({
            Message: `New Image Added Successfully with Imagetype ${_ImageType}`,
            Data: true
          });
        });
      }
    }
  } catch (error) {
    fs.unlinkSync(`./AboutUsComponentImages/${_ImageDetails.imageUrl}`);
    res.json({
      Message: `There is Some Error${error.message}`,
      Data: false
    })
  }

})

//Block Ends  For Adding AboutUs Component Images Dynamically


//Block Start For Getting The AboutUs Component Images
Router.get('/Images', async (req, res) => {
  let _Data = await AboutUsComponentDynamicContentCollection.find();
  try {
    res.json({
      Message: `Data Found Successfully`,
      Data: true,
      Result: _Data
    })
  } catch (error) {
    res.json({
      Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
      Data: true,
      Result: _Data
    })
  }
})
//Block Ends For Getting The AboutUs Component Images

//Block Starts For Adding AboutUs Component Heading Dynamically
Router.post('/Headings', async (req, res) => {
  let _HeadingCategory = req.body.HeadingCategory;
  let _Heading = req.body.Heading;
  let _HeadingDescription = req.body.HeadingDescription;
  let _RequestBodyData = req.body;
  let _Data = await AboutUsComponentDynamicHeadingsCollection.find();
  try {
    if (_Data.length <= 0) {
      //If the Collecion is Empty hen Save A New Document
      const _DocToSave = await new AboutUsComponentDynamicHeadingsCollection(_RequestBodyData);
      _DocToSave.save().then(docs => {
        res.json({
          Message: 'New Heading Added Successfully',
          Data: true
        });
      });
    } else {
      // If there is/are Documents are in the collection then Update It.
      _HeadingCategoryExist = await AboutUsComponentDynamicHeadingsCollection.find({ HeadingCategory: _HeadingCategory });
      if (_HeadingCategoryExist.length > 0) { //It mean we have focund the document with Heading Category
        await AboutUsComponentDynamicHeadingsCollection.findOneAndUpdate({ HeadingCategory: _HeadingCategory }, { $set: { Heading: _Heading, HeadingDescription: _HeadingDescription } })
          .then(() => {
            res.json({
              Message: `${_HeadingCategory} Updated Successfully`
            })
          })
      } else {
        //If The We done FInd The _HeadingCategory There Then add a new document
        const _DocToSave = await new AboutUsComponentDynamicHeadingsCollection(_RequestBodyData);
        _DocToSave.save().then(docs => {
          res.json({
            Message: `${_HeadingCategory} Added Successfully`
          });
        });
      }
    }
  } catch (error) {
    res.json({
      Message: error.message,
      Data: false
    })
  }
})
//Block Ends  For Adding AboutUs Component Heading Dynamically

//Block Starts For Getting The AboutUs Component Images

Router.get('/Headings', async (req, res) => {
  let _Data = await AboutUsComponentDynamicHeadingsCollection.find();
  try {
    res.json({
      Message: `Data Found Successfully`,
      Data: true,
      Result: _Data
    })
  } catch (error) {
    res.json({
      Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
      Data: true,
      Result: _Data
    })
  }
})

//Block Ends For Getting The AboutUs Component Images



//Block Starts For Adding AboutUs Component Teams Dynamically

let uploadAboutUsTeamImage = multer({
  storage: multer.diskStorage({
    destination: (req, next, cb) => {
      // let path = `./ProductCategoryImages/${req.body.FolderName}`;
      let path = `./AboutUsTeamImages`;
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
    console.log(path);
    },
    filename: (req, file, cb) => {
      if(!file){
        res.json({
          Message:'You have not selected any file'
        })
      }
      else{
        const md5sum = hashFunc(file.originalname);
      //originalname is the uploaded file's name with date iso String
      let ext = file.mimetype.split('/')[1];
      // Fix svg+xml bug
      if (ext.includes('svg')) {
        ext = 'svg';
      }

      cb(null, `${Date.now()}_${md5sum}.${ext}`);
      }
      
    }
  })
});


Router.post('/Teams', uploadAboutUsTeamImage.single('TeamImage'), async (req, res) => {

  try {
    let _MemberCategory = req.body.MemberCategory;
    let _TeamDetail = {
      Name: req.body.Name,
      Role: req.body.Role,
      MemberCategory: req.body.MemberCategory,
      imageType: req.body.ImageType,
      imageUrl: req.file.filename,
      imageName: req.file.originalname,
      imageMimeType: req.file.mimetype
    }
    let _Data = await AboutUsComponentDynamicTeam.find();
    
    if (_Data.length <= 0) {
      //If the Collecion is Empty hen Save A New Document
      const _DocToSave = await new AboutUsComponentDynamicTeam(_TeamDetail);
      _DocToSave.save().then(docs => {
        res.json({
          Message: `Team Member Added Successfully And The Member is ${_MemberCategory}`,
          Data: true
        });
      });
    } else {
      // If there is/are Documents are in the collection then Update It.
      let _MemberAlreadyExists = await AboutUsComponentDynamicTeam.find({ MemberCategory: _MemberCategory  });
      if (_MemberAlreadyExists.length > 0) { //It mean we have focund the document with Heading Category
       let Data = await AboutUsComponentDynamicTeam.findOneAndUpdate({ MemberCategory: _MemberCategory }, { $set: {
          Name: req.body.Name,
          Role: req.body.Role,
          MemberCategory: req.body.MemberCategory,
          imageType: req.body.ImageType,
          imageUrl: req.file.filename,
          imageName: req.file.originalname,
          imageMimeType: req.file.mimetype
        } })
        fs.unlinkSync(`./AboutUsTeamImages/${_MemberAlreadyExists[0].imageUrl}`);
        res.json({
          Message: `Team Member Updated Successfully And Member is ${_MemberCategory}`,
          Data: true
        })
      } else {
        //If The We done FInd The _HeadingCategory There Then add a new document
        const _DocToSave = await new AboutUsComponentDynamicTeam(_TeamDetail);
        _DocToSave.save().then(docs => {
          res.json({
            Message: `New Team Member Added Successfully And Member is ${_MemberCategory}`,
            Data: true
          });
        });
      }
    }
  } catch (error) {
    
    res.json({
      Message: `There is Some Error${error.message}`,
      Data: false
    })
  }

})

//Block Ends  For Adding AboutUs Component Teams Dynamically

//Block Starts For Getting The AboutUs Component Team Data

Router.get('/Teams', async (req, res) => {
  let _Data = await AboutUsComponentDynamicTeam.find();
  try {
    res.json({
      Message: `Data Found Successfully`,
      Data: true,
      Result: _Data
    })
  } catch (error) {
    res.json({
      Message: `Data Not Found! Either The DataBAse Collection is Empty or ${error.message}`,
      Data: true,
      Result: _Data
    })
  }
})

//Block Ends For Getting The AboutUs Component Team Data



module.exports = Router;