const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');

function generateName(){
    return `${format(new Date(),'dd-MM-yyyy-hh-mm-ss')}.txt`;
}

function createSms(phone, text){
    fs.writeFileSync(path.join(__dirname,'..', 'sms','outgoing', `sms-${generateName()}`), `To:${phone}\n\n${text}`);
    console.log('sms file created');
}

module.exports = createSms;