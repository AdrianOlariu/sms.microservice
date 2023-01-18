const express = require('express');
const router = express.Router();
const path = require('path');
const { stringify } = require('querystring');
const smsConfig = require('../middleware/smsConfig');

router.route('/').get(async (req, res)=>{
	if(req.body.phone){
		let sms = await smsConfig.getSms(req.body.phone);
		res.json(sms);
	}else{
		let lastSms = await smsConfig.lastSms();
		res.json(lastSms);
	}	
	// smsConfig.getSms(req.params.number);
	// console.log(req.body);
	// smsConfig.getSms('0745133925').then(data => console.log(data[0]));
	// console.log(lastSms);
	
});

router.route('/').post((req, res)=>{
	const {phone, text} = req.body;
	console.log(phone, text);
	res.json({"success":"sms sent","phone":phone, "text":text});
});


module.exports = router;






