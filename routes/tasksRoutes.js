const {Router}=require("express");
const auth = require("../middlewares/auth");
const TaskModel = require("../models/tasksModel");


const tasksRoute=Router();


tasksRoute.post("/add",auth,async(req,res)=>{//To add new task of a user;
   let task=req.body; 
    try {
        let newTask=new TaskModel(task);
       await newTask.save();
        res.status(200).send({msg:"task has been added",task})
    } catch (error) {
        res.status(200).send({msg:error})
    }
})

tasksRoute.delete('/:id',auth,async(req,res)=>{
    let {id}=req.params;
    try {
      await TaskModel.findByIdAndDelete(id);
      res.status(200).send({msg:"task has been deleted"}); 
    } catch (error) {
        res.status(500).send({msg:error});      
    }
})

tasksRoute.patch('/:id',async(req,res)=>{
    let {id}=req.params;
    try {
      await TaskModel.findByIdAndUpdate(id,req.body);
      res.status(200).send({msg:"task has been updated",updated:req.body}); 
    } catch (error) {
        res.status(500).send('outer error');      
    }
})

tasksRoute.get('/:id',async(req,res)=>{
    // let {limit,department}=req.query;
    let userId=req.params;
    try {
      let Data=await TaskModel.find({userId:userId.id});
      console.log(Data);
      res.status(200).send({tasks:Data}); 
    } catch (error) {
        res.status(500).send({msg:error});      
    }
})

// {"task":"Complete Project",
// "description":"Make a todo website where we can manage tasks",
// "priority":"high",
// "status":"progress"} demo data for task adding

module.exports=tasksRoute;