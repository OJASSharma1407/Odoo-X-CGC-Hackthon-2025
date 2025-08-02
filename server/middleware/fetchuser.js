const jwt = require('jsonwebtoken');
require('doten').config();

const fetchuser = async(req,res,next)=>{
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).send("Authenatication Failed");
    }

    try{
        const data =  jwt.verify(token,secret);
        req.user = data;
        next();
    }catch(err){
        res.status(500).send("Internal server error");
    }
}

module.exports = fetchuser;