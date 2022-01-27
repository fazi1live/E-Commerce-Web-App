//This Route Should be Added Into General Settings

const express = require("express");
const Router = express.Router();
const multer = require("multer");
const fs = require("fs");
const AddingVideoDynamicallyCollection = require("../app/models/AddingVideoDynamicallyModel");

//Block Start For Adding Video Dynamically
let UploadVideo = multer({
  storage: multer.diskStorage({
    destination: (req, next, cb) => {
      let path = `./videos`;
      cb(null, path);
    },
    filename: (req, file, cb) => {
      //originalname is the uploaded file's name with date iso String
      cb(null, Date.now() + file.originalname);
    },
  }),
});

Router.post("/AddingVideoDynamically",UploadVideo.single("video"), async(req, res) => {
  let DocsToManage = await AddingVideoDynamicallyCollection.find();  
  try {
      //Operation to check and Delete Existing Document
      if (DocsToManage.length===0) {
        void(0);
      } else {
        await AddingVideoDynamicallyCollection.deleteMany();
        fs.unlinkSync(`./videos/` + `${DocsToManage[0].videoUrl}`);
      }
      //Operation to check and Delete Existing Document

      const VideoToSaveInfo = {
        videoUrl: req.file.filename,
        videoName: req.file.originalname,
        videoMimeType: req.file.mimetype
      };
      const docToSave = await new AddingVideoDynamicallyCollection(
        VideoToSaveInfo
      );
      docToSave.save().then((result) => {
        res.json({
          Message: "Video Updated Successfully",
          Data: result,
          Status: 1
        });
      });
    } catch (error) {
      fs.unlinkSync(`./videos/` + `${DocsToManage[0].videoUrl}`);
      res.json({
        Error: error.message,
        Data: null,
        Status: 0,
      });
    }
  }
);
//Block End For Adding Video Dynamically

//Block Start For Getting The Video From DataBase
Router.get("/GetDynamicVideo", async (req, res) => {
  try {
    const GetData = await AddingVideoDynamicallyCollection.find();
    if (GetData.length===0) {
      res.json({
        Message: "There is No Video Data",
        Data: null,
        Status:0
      });
    } else {
      res.json({
        Message: "Here You Go With Your New Video",
        Data: GetData,
        Status:1
      });
    }
  } catch (error) {
    res.json({
      Data: null,
      Message: "SomeThing Wrong",
      Error: error.message,
      Status:0
    });
  }
});
//Block End For Getting The Video From DataBase

//Block Start For Deleting The Dynamic Videos From Collection
//Block End For Deleting The Dynamic Videos From Collection

module.exports = Router;
