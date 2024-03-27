const jwt=require("jsonwebtoken");
const BkModel = require("../models/bkModel");


const auth=async(req,res,next)=>{//auth middleware to authorize the user using jwt

       try {
        const {authorization}=req.headers;
        const token=authorization.split(" ")[1];
        const user=jwt.verify(token,'neo');
        if(!user){
            res.status(400).send({msg:'unauthorized token'});
        }else {
        console.log(user);
        const check=await BkModel.findOne({token});
        if(check){
            res.status(400).send({msg:'login first'});
        }else{
          req.body.userId=user.id;
          next();
        }
        } 
       } catch (error) {
        res.status(400).send({msg:error});
       }
     
    }
    
    module.exports=auth;
