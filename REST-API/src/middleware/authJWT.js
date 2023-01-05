const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const db = require("../models");
const User = db.user;

exports.verifyTokenUser = (req,res,next) => {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).send({msg:"No token found!"});

    jwt.verify(token,config.secret,(error,token_decoded)=>{
        if(error){
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        const user = User.findOne({username:token_decoded.username});
        if(user.roles !== "user"){
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        req.username = token_decoded.username;
        next();
    });
}

exports.verifyTokenAdmin = (req,res,next) => {
    const token = req.headers["x-access-token"];

    if(!token) return res.status(403).send({msg:"No token found!"});

    jwt.verify(token,config.secret,(error,token_decoded)=>{
        if(error){
            console.log(error);
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        const user = User.findOne({username:token_decoded.username});
        if(user.roles !== "admin"){
            return res.status(401).send({
                msg:"Unauthorized"
            })
        }
        req.username = token_decoded.username;
        next();
    });
}