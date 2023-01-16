const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');
const { exit } = require('process');

function generateName(){
    return `${format(new Date(),'dd-MM-yyyy-hh-mm-ss')}.txt`;
}

function createSms(phone, text){
    if(phone[0] === '0'){
        phone = '+4' + phone;
    }else if(phone[0] === '4'){
        phone = '+' + phone;
    }else if(phone[0] === '+'){
        phone = phone;
    }
    let smsFileName = `sms-${generateName()}`;
    fs.writeFileSync(path.join(__dirname,'..', 'sms','outgoing', smsFileName), `To:${phone}\n\n${text}`);
    //treat the cases in which a wrong phone number is inserted
}

function checkSmsStatus(smsFileName, res){
    fs.watch(path.join(__dirname,'..', 'sms','sent'), (eventType, fileName) => {
        console.log(eventType);
        console.log('reached');
        console.log(fileName);
        })
        if(smsFileName === fileName){
            return res;
        }
}

module.exports = {createSms, checkSmsStatus};