const express = require('express');
const Router = express.Router();
const EmbeddedDataModel = require('../app/models/DataModelingModel');


Router.post('/Embed', async (req, res) => {
    const _ExtraInfo = await req.body.ExtraInfo; 
    try {
        const _EmbeddedDataModel = await new EmbeddedDataModel({
            class: req.body.class,
            ExtraInfo:_ExtraInfo
        })
        await _EmbeddedDataModel.save();
        res.json(_EmbeddedDataModel);
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})


module.exports = Router;
