require('dotenv').config();

function checkApiKey(){
    return (req, res, next) => {
        const {key} = req.query;
        console.log(req.query);
        if("ef1decb2a75ededa273bd5aea2ef1d0b8a042547dc5b96892a635f10081c0d4b257687f2290352591f7c9ad5fdb1c1cb1e263f02b8e5e65fe7b5835109af2a1a" === key){
            next();
        }else{
            res.status(500).json({'unauthorized':'wrong api key'});
        }
    }
}

module.exports = {checkApiKey}