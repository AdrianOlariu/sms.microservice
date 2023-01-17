const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

function generateName(){
    return `${format(new Date(),'dd-MM-yyyy-hh-mm-ss')}.txt`;
}

function checkNumberFormat(){
    return (req, res, next) =>{
        let {phone} = req.body;
        if(phone[0] != '+' && (phone[0] != '4') && phone[0] != '0' && phone[0] != '7'){
            res.status(400);
            res.json({"failed":"phone number format incorrect"});
        }else{
            next();
        }
    }
}

function createSms(){
    return (req, res, next) => {
        let {phone, text} = req.body;
        if(phone[0] === '0'){
            phone = '+4' + phone;
        }else if(phone[0] === '4'){
            if(phone[1] === '0'){
                phone = '+' + phone;
            }else{
                res.status(400);
                return res.json({"failed":"phone number format incorrect"});
            }
        }else if(phone[0] === '+'){
            phone = phone;
        }else if(phone[0] === '7'){
            phone = '+40' + phone;
        }
        let smsFileName = `sms-${generateName()}`;
        fs.writeFileSync(path.join(__dirname,'..', 'sms','outgoing', smsFileName), `To:${phone}\n\n${text}`);
        checkSmsStatus(smsFileName, res, next);
    }
}

function checkSmsStatus(smsFileName, res, next){
        fs.watch(path.join(__dirname,'..', 'sms','modem1'), (eventType, fileName) => {
            console.log(eventType);
            console.log('reached');
            console.log(fileName);
                if(fs.existsSync(path.join(__dirname,'..', 'sms','sent', smsFileName))){
                    console.log('file moved to sent folder');
                    next();
                }else if(fs.existsSync(path.join(__dirname,'..', 'sms','failed', smsFileName))){
                    res.status(500).json({"failed":"sms not sent due to internal server error"});
                }   
            })
            
}

module.exports = {checkNumberFormat, createSms, checkSmsStatus};