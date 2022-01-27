const express = require('express');
const Router = express.Router();



const apiKey = 'EZAKf4b6fb2982f94f268e509edc10aec9d5Rqz9dY82dR07mSKdl4gCSg';
const EasyPost = require('@easypost/api');
const api = require('@easypost/api');

Router.post('/Ship', async (req, res) => {
  let _Name = req.body.name;
  let _Street = req.body.street;
  let _City = req.body.city;
  let _Zip = req.body.zip;
  let _State =  req.body.state;
  try {
    const api = new EasyPost(apiKey);

    const fromAddress = new api.Address({
      verify: ['delivery'],
      company: 'pf',
      street1: '21 old county rd',
      city: 'gloucster',
      state: 'MA',
      zip: '01930',
      phone: '415-528-7555'
    });

    const toAddress = new api.Address({
      name: _Name,
      company: _Name,
      street1: _Street,
      city: _City,
      state: _State, 
      zip: _Zip
    });

    const parcel = new api.Parcel({
      predefined_package:'LargeParcel',
      weight: 150,
    });


    const shipment = new api.Shipment({
      to_address: toAddress,
      from_address: fromAddress,
      parcel:parcel
    });

    await shipment.save().then(s => {
      res.json({
        Result: s.rates,
        Data:true,
        body:s
      })
    });



    // let _Data = await fromAddress.save();

    // if(_Data.verifications.delivery.success === false){
    //   res.json({
    //     Message:_Data.verifications.delivery.errors,
    //     Data:false
    //   })
    // }else{
    //   const parcel = new api.Parcel({
    //     predefined_package: 'Parcel',
    //     weight: 10,
    //   })
    //   res.json({
    //     Message:_Data,
    //     Data:true
    //   })
    // }
  } catch (error) {
    res.json({
      Message: `There is some error and there error is ${error.message}`,
      Data: false,
      Result: `Data`
    })
  }


})

Router.get('/getship', async(req, res) => {
  const api = new EasyPost(apiKey);
  api.Shipment.retrieve('shp_f9bc7ea459ac42de88a091db41380453').then(s => {
    s.buy(s.lowestRate()).then(console.log).catch(console.log);
    // s.buy('rate_...').then(console.log).catch(console.log);
    res.json({
      Message:'fine'
    })
  }).catch(console.log);
})
module.exports = Router;