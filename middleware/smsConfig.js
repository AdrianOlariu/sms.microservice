const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');
const {format} = require('date-fns');
let sms = [];

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

async function readSms(phoneNumber){
    const files = fs.readdirSync(path.join(__dirname,'..','sms','incoming'));
    
    let messages =[];
    files.forEach(async (file)=>{
        const sms = await fs.promises.readFile((path.join(__dirname,'..','sms','incoming',file)),'utf-8');
        messages.push(sms);
        // console.log(messages);
    });

    return messages;
}

async function lastSms(){

    const files = await fsPromises.readdir(path.join(__dirname,'..','sms','incoming'));

    return Promise.resolve(fsPromises.readFile(path.join(__dirname,'..','sms','incoming',files[files.length-1]), 'utf-8'));
}

lastSms().then(result=>console.log(result));


async function smsPaths(){
    
    const files = await fsPromises.readdir(path.join(__dirname,'..','sms','incoming'));

    const paths = files.map(filePath => {
        return path.join(__dirname,'..','sms','incoming',filePath);
    })

    return paths;

}

async function readSmses(){
    return smsPaths().then(async data => {
        const smses = await data.map(data =>{
            console.log(data);
            return fsPromises.readFile(data, 'utf-8');
        })

        return Promise.all(smses);
    });
}

function getSms(phoneNumber){
    return readSmses().then(
        data => {
            let smses = data.map(sms =>{
                if(sms.substring(6,17).includes(phoneNumber)){
                    return sms;
                }else{
                    return;
                }
            })
            return Promise.resolve(smses);
        });
}

// getSms('0745133925').then(data => console.log(data[0]));
module.exports = {checkNumberFormat, createSms, checkSmsStatus, getSms, lastSms};