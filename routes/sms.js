
const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const {createSms, checkNumberFormat, checkSmsStatus} = require('../middleware/smsConfig');
const {checkOrigin} = require('../middleware/checkOrigin');


router.post('/',checkOrigin(), checkNumberFormat(), createSms(), (req,res)=>{
	const {phone, text} = req.body;
	res.json({"message":"sms sent","phone":phone, "text":text});
	
});


module.exports = router;
