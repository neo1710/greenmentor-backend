const express=require("express");
const cors=require("cors");
const dotenv=require("dotenv");
const db=require("./db");
const userRoute = require("./routes/userRoutes");
const tasksRoute = require("./routes/tasksRoutes");


const server=express();
server.use(express.json());
server.use(cors());
server.use(userRoute);
server.use("/tasks",tasksRoute);

server.get("/",(req,res)=>{
res.status(200).send({msg:"home"});
})

server.listen(8080,async()=>{
try {
    await db;
    console.log("connect");//mongodb connection
    console.log("running 8080")//server running
} catch (error) {
  console.log(error)  
}
})