const allowedOrigins = ['http://sms.luxartem.ro'];

function checkOrigin(origin){
    return (req, res, next) => {
        console.log(req.get('origin'));
        let allowed = false;
        allowedOrigins.forEach(origin => {
            if(origin.includes(req.get('origin').toString())){
                allowed = true;
            }
        })

        console.log(allowed);
        if(allowed){
            next();
        }else{
                res.status(401).json({"bad request":"unauthorized origin"});
        }
    }
}

module.exports = {checkOrigin};