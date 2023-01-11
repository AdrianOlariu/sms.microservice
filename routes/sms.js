
const express = require('express');
const fs = require('fs');
const router = express.Router();
const createSms = require('../middleware/createSms');

router.get('/',(req,res)=>{

	res.json({"ceva":"ceva"});
});

router.post('/',(req,res)=>{
	const {phone, text} = req.body;
	console.log(phone, text);
	createSms(phone,text);
	res.json({"success":"sms send to Q","phone":phone, "text":text});
});


module.exports = router;
