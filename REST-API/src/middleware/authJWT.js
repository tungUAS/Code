const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;

exports.verifyToken = (req,res,next) => {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).send({msg:"No token found!"});

    jwt.verify(token,config.secret,(error,token_decoded)=>{
        if(error){
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        req.username = token_decoded.username;
        next();
    });
}