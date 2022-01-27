const express = require('express');
const router = express.Router();
var api_key = 'c799c055e43ebfb9c7c727a2d9dda01e-1f1bd6a9-3a0f3df8';
var domain = 'sandbox2cdce07d8f3f4f30864d7287abc1918d.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

router.post('/SendEmail',(req,res)=>{
    var _SendEmailData=`
    <div style="background-color: #5cb85c; border-radius: 5px;font-weight: bolder;font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; color:white">
    <ul>
        <li>SenderName: ${req.body.name}</li>
        <li>SenderEmail: ${req.body.email}</li>
        <li>SenderInstagram: ${req.body.instaUserName}</li>
        <li>SenderInstagram: ${req.body.WhyDoYouWantToFollowUs}</li>
        <li>SenderInstagram: ${req.body.WhyDoYouWantTOBecomeAnAmbassador}</li>
        <li>SenderInstagram: ${req.body.WhereYouFrom}</li>
    </ul>
    <u>
    <li><h2>SenderMessage</h2></li>
    <li><p>${req.body.message}</p></li>
    </ul>
    </div>
    `;
    var Data = {
        from: req.body.email,
        to: 'shaamsi29@gmail.com',
        subject: req.body.subject,
        html:_SendEmailData
    };
       
      mailgun.messages().send(Data, function (error, body) {
        if(error){
          return res.json({
            Message:error
          })
        }else{
          return res.json({
            Message:"We Have Recieved Your Email We WIll Get Back To You Ass Soon As Possible",
            Data:body
          });
        }
      });
});

module.exports = router;