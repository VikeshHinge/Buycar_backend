const jwt = require('jsonwebtoken')

const dealerAuthantication = (req,res,next) => {

     const token = req.headers.authorization ;
     delete req.body._id;

    if(token){
       jwt.verify(token,'buycars',(err,decoded)=>{
        if(decoded){
           req.body.user = decoded.userId;
           next()
        }else{
            res.send({'err':err})
        }
        
       })
    }else{
        res.send({'sug':'you are not autharized!'})
    }

}

module.exports = {dealerAuthantication}