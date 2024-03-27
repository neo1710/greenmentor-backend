const {Router}=require("express");
const UserModel = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const userRoute=Router();

userRoute.post("/register",async(req,res)=>{
let {name,email,password}=req.body;
    try { 
        let check= await UserModel.findOne({email});
        console.log(check);
        if(check){
            res.status(200).send({msg:"user already exist"});
        }else{
          bcrypt.hash(password,5,async(err,hashed)=>{
            if(hashed){
                let user=new UserModel({name,email,password:hashed})
                await user.save();
                res.status(200).send({msg:"user has been added"});
            }else{
                res.status(400).send({msg:"something went wrong"});
            }
          })
           
        }
} catch (error) {
    res.status(400).send({msg:error})
}
})

userRoute.post("/login",async(req,res)=>{
    let {email,password}=req.body;
        try { 
            let check= await UserModel.findOne({email});
            console.log(check);
            if(check){
                bcrypt.compare(password,check.password,async(err,same)=>{
                    if(same){
                        let token=jwt.sign({email:email,id:check._id},"neo");
                        res.status(200).send({msg:"user has been logged in",check,token});
                    }else{
                        res.status(400).send({msg:"wrong password"});
                    }
                  })
            }else{
             
                res.status(400).send({msg:"user does not exist."});
            }
    } catch (error) {
        res.status(400).send({msg:error})
    }
    })

module.exports=userRoute;