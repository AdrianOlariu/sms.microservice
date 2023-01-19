require('dotenv').config();

function checkApiKey(){
    return (req, res, next) => {
        const {key} = req.query;
        console.log(req.query);
        if(process.env.PUBLIC_KEY === key){
            next();
        }else{
            res.status(500).json({'message':'wrong api key'});
        }
    }
}

module.exports = {checkApiKey}