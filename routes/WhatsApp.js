const express = require('express');
const router = express.Router();
const accountSid = 'ACcf8b2437d51bf28f4a28538a2d79d2f9';
const authToken = 'f87bd11627e521e0008b4363c6cc96af';
const client = require('twilio')(accountSid, authToken);

router.post('/SendMessage', (req, res) => {
    const _SendMessage = req.body.WhatsAppMessage;
    const _PhoneNumber=req.body.PhoneNumber;

    client.messages.create({
        from: 'whatsapp:+14155238886',
        body: _SendMessage+' '+_PhoneNumber,
        to: 'whatsapp:+923234101934'
    })
        .then(message => {
            res.json({
                Message: "We Have Recieved your Message We will get bakc to you Soon on whats app",
                })
        })
        .catch(err => {
            res.json({
                Error: err.message,

            })
        })
});


module.exports = router;