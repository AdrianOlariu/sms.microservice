
const express = require('express');
const fs = require('fs');
const router = express.Router();
const {createSms, checkNumberFormat, checkSmsStatus} = require('../middleware/smsConfig');

router.get('/',(req,res)=>{

	res.json({"ceva":"ceva"});
});

router.post('/',checkNumberFormat(), createSms(), (req,res)=>{
	const {phone, text} = req.body;
	console.log(phone, text);
	res.json({"success":"sms sent to Q","phone":phone, "text":text});
	
});


module.exports = router;
