const express = require('express');
const router = express.Router();
const path = require('path');
const smsConfig = require('../middleware/smsConfig');
const {checkApiKey} = require('../middleware/checkApiKey');
const {checkOrigin} = require('../middleware/checkOrigin')

router.route('/').get(async (req, res)=>{
	if(req.query.phone){
		console.log(req.query.phone);
		let sms = await smsConfig.getSms(req.query.phone);
		res.json(sms);
	}else if(req.query.last){
		let lastSms = await smsConfig.lastSms();
		res.json(lastSms);
	}
});

router.route('/').post(checkApiKey(), checkOrigin(), smsConfig.checkNumberFormat(), smsConfig.createSms(), (req, res)=>{
	const {phone, text} = req.query;
	console.log(phone, text);
	res.json({"success":"sms sent","phone":phone, "text":text});
});


module.exports = router;






